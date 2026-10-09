"use strict";

/**
 * 环节切换提醒（提示音 + 视觉提示）回归测试。
 *
 * 覆盖：
 * 1. 三个触发入口：倒计时自然跨入、点击「下一环节」、下拉框跳转
 * 2. 同一次切换只提示一次（自然跨入与手动跳转叠加时也不重复）
 * 3. 「环节切换提示音」开关关闭时不发声、不显示视觉提示
 * 4. 开关偏好持久化（localStorage / 自定义考试配置 / 重置显示设置）
 * 5. AudioContext 不可用或构造失败时静默降级，不影响考试计时
 *
 * 运行：node --test tests
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { loadExamClockScript } = require("./dom-stub");

/**
 * 含一个「不计入总时间」环节的自定义考试：
 * 计入时长 10 + 60 = 70 分钟；不计入的「课间休息」为零时长占位。
 */
function makeCustomExam(displaySettings) {
  return {
    id: 202,
    name: "自定义：环节提示测试",
    startTime: "09:00",
    date: "2026-06-20",
    totalMinutes: 70,
    displaySettings: displaySettings,
    sections: [
      { name: "考前准备", duration: 10, description: "发卷", countInTotal: true },
      {
        name: "课间休息",
        duration: 5,
        description: "休息",
        countInTotal: false,
      },
      { name: "第一部分", duration: 60, description: "作答", countInTotal: true },
    ],
  };
}

/**
 * 构造一个记录调用的假 AudioContext。
 * @param {"running"|"suspended"} initialState 构造时的初始状态
 */
function createAudioRecorder(initialState = "running") {
  const record = {
    contexts: [],
    oscillators: [],
    gains: [],
    resumeCalls: 0,
  };

  class FakeAudioContext {
    constructor() {
      this.state = initialState;
      this.currentTime = 0;
      this.destination = { name: "destination" };
      record.contexts.push(this);
    }

    resume() {
      record.resumeCalls += 1;
      this.state = "running";
      return Promise.resolve();
    }

    createGain() {
      const node = {
        gain: {
          setValueAtTime() {},
          exponentialRampToValueAtTime() {},
        },
        connect() {},
      };
      record.gains.push(node);
      return node;
    }

    createOscillator() {
      const node = {
        type: "",
        frequency: { setValueAtTime() {} },
        connect() {},
        start() {},
        stop() {},
      };
      record.oscillators.push(node);
      return node;
    }
  }

  return { record, FakeAudioContext };
}

/**
 * 加载 script.js 并注入假 AudioContext。
 * @returns {{ document: object, localStorage: object, api: object, record: object }}
 */
function loadWithAudio(initialState = "running", globals) {
  const { record, FakeAudioContext } = createAudioRecorder(initialState);
  const env = loadExamClockScript(undefined, {
    globals: Object.assign({ AudioContext: FakeAudioContext }, globals),
  });
  return {
    document: env.document,
    localStorage: env.localStorage,
    api: env.api,
    record: record,
  };
}

/** 模拟"从考试开始已过去 elapsedSeconds 秒"的自然推进 */
function advanceTo(api, elapsedSeconds) {
  api.isRunning = true;
  api.elapsedBeforeLastStart = 0;
  api.startTimeStamp = Date.now() - elapsedSeconds * 1000;
  api.updateTimer();
}

/** 取出当前页面上的环节切换浮层提示 */
function getToasts(document) {
  return document.body.children.filter(
    (child) => child.className === "section-change-toast",
  );
}

function isFlashing(document) {
  return document
    .getElementById("currentSection")
    .classList.contains("section-change-flash");
}

test("应用配置与开始考试都不提示（基线）", () => {
  const { document, api, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  assert.strictEqual(api.lastNotifiedSectionIndex, 0);
  assert.strictEqual(getToasts(document).length, 0);
  assert.strictEqual(record.oscillators.length, 0);

  api.startExam();
  assert.strictEqual(record.contexts.length, 1, "开始考试应创建 AudioContext");
  assert.strictEqual(api.lastNotifiedSectionIndex, 0);
  assert.strictEqual(getToasts(document).length, 0);
  assert.strictEqual(record.oscillators.length, 0, "开始考试不应播放提示音");
  assert.strictEqual(isFlashing(document), false);
});

test("倒计时自然跨入下一环节时播放提示音并显示视觉提示", () => {
  const { document, api, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.startExam();
  // 第 10 分钟跨入「第一部分」（占位环节「课间休息」与其同起点）
  advanceTo(api, 10 * 60 + 1);

  assert.strictEqual(api.formatTime(api.timeLeft), "00:59:59");
  assert.strictEqual(api.lastNotifiedSectionIndex, 2);

  // 两个短音符对应 2 个振荡器，另有 2 个音符增益 + 1 个总线增益
  assert.strictEqual(record.oscillators.length, 2);
  assert.strictEqual(record.gains.length, 3);
  assert.strictEqual(record.oscillators[0].type, "sine");

  const toasts = getToasts(document);
  assert.strictEqual(toasts.length, 1);
  assert.strictEqual(toasts[0].textContent, "环节切换：第一部分");
  assert.strictEqual(isFlashing(document), true);
});

test("同一次切换只提示一次（重复刷新不再发声）", () => {
  const { document, api, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.startExam();
  advanceTo(api, 10 * 60 + 1);
  const oscillatorsAfterFirst = record.oscillators.length;
  const toastsAfterFirst = getToasts(document).length;

  advanceTo(api, 10 * 60 + 5);
  advanceTo(api, 30 * 60);

  assert.strictEqual(record.oscillators.length, oscillatorsAfterFirst);
  assert.strictEqual(getToasts(document).length, toastsAfterFirst);
});

test("点击「下一环节」时提示，随后的自然刷新不会重复提示", () => {
  const { document, api, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.startExam();
  assert.strictEqual(api.formatTime(api.timeLeft), "01:10:00");

  api.nextSection();
  assert.strictEqual(record.oscillators.length, 2, "点击下一环节应播放提示音");
  assert.strictEqual(getToasts(document)[0].textContent, "环节切换：第一部分");
  assert.strictEqual(api.lastNotifiedSectionIndex, 2);
  // 跳过零时长占位后落在第 10 分钟
  assert.strictEqual(api.formatTime(api.timeLeft), "01:00:00");

  // 紧接着的定时刷新命中同一环节，不应再次提示
  advanceTo(api, 10 * 60);
  assert.strictEqual(record.oscillators.length, 2);
  assert.strictEqual(getToasts(document).length, 1);
});

test("下拉框跳转触发提示（handleSectionChange）", () => {
  const { document, api, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.startExam();

  document.getElementById("sectionSelect").value = "2";
  api.handleSectionChange();

  assert.strictEqual(record.oscillators.length, 2);
  assert.strictEqual(getToasts(document)[0].textContent, "环节切换：第一部分");
  assert.strictEqual(
    document.getElementById("currentTimeSpan").textContent,
    "09:10:00",
  );
});

test("下拉框跳到末尾「考试结束」同样提示", () => {
  const { document, api, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.startExam();

  const endIndex = api.examSections.length - 1;
  document.getElementById("sectionSelect").value = String(endIndex);
  api.skipToSelectedSection();

  assert.strictEqual(api.timeLeft, 0);
  assert.strictEqual(getToasts(document)[0].textContent, "环节切换：考试结束");
  assert.strictEqual(record.oscillators.length, 2);
});

test("自然运行到考试结束（timeLeft 归零）提示一次", () => {
  const { document, api, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.startExam();
  advanceTo(api, api.totalTime + 5);

  assert.strictEqual(api.timeLeft, 0);
  assert.strictEqual(getToasts(document)[0].textContent, "环节切换：考试结束");
  assert.strictEqual(record.oscillators.length, 2);
});

test("关闭开关后不发声、不显示视觉提示，并清理已有提示", () => {
  const { document, api, localStorage, record } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.startExam();
  advanceTo(api, 10 * 60 + 1);
  assert.strictEqual(getToasts(document).length, 1);
  assert.strictEqual(isFlashing(document), true);

  api.toggleDisplaySetting("showSectionAlert", false);

  assert.strictEqual(api.showSectionAlert, false);
  assert.strictEqual(
    JSON.parse(localStorage.getItem("displaySettings")).showSectionAlert,
    false,
  );
  assert.strictEqual(getToasts(document).length, 0, "关闭开关应清理浮层提示");
  assert.strictEqual(isFlashing(document), false, "关闭开关应清理闪烁高亮");

  const oscillatorsAfterOff = record.oscillators.length;
  document.getElementById("sectionSelect").value = "3";
  api.handleSectionChange();

  assert.strictEqual(record.oscillators.length, oscillatorsAfterOff);
  assert.strictEqual(getToasts(document).length, 0);
  assert.strictEqual(isFlashing(document), false);
});

test("勾选开关时创建并恢复 AudioContext（用户手势）", () => {
  const { document, api, record } = loadWithAudio("suspended");

  api.applyCustomExamConfig(makeCustomExam());
  api.toggleDisplaySetting("showSectionAlert", true);

  assert.strictEqual(record.contexts.length, 1);
  assert.strictEqual(record.resumeCalls, 1, "suspended 状态应调用 resume()");

  api.startExam();
  advanceTo(api, 10 * 60 + 1);
  assert.strictEqual(record.oscillators.length, 2);
  assert.strictEqual(getToasts(document).length, 1);
});

test("AudioContext 不可用或构造失败时静默降级，视觉提示仍生效", () => {
  // 环境不支持 Web Audio：沙箱中不存在 AudioContext
  const noAudio = loadExamClockScript();
  noAudio.api.applyCustomExamConfig(makeCustomExam());
  noAudio.api.startExam();
  advanceTo(noAudio.api, 10 * 60 + 1);
  assert.strictEqual(getToasts(noAudio.document).length, 1);
  assert.strictEqual(isFlashing(noAudio.document), true);

  // 构造 AudioContext 抛异常（例如被浏览器策略拦截）
  class ThrowingAudioContext {
    constructor() {
      throw new Error("音频被禁用");
    }
  }
  const broken = loadExamClockScript(undefined, {
    globals: { AudioContext: ThrowingAudioContext },
  });
  broken.api.applyCustomExamConfig(makeCustomExam());
  assert.doesNotThrow(() => broken.api.startExam());
  advanceTo(broken.api, 10 * 60 + 1);
  assert.strictEqual(getToasts(broken.document).length, 1);
  assert.strictEqual(broken.api.formatTime(broken.api.timeLeft), "00:59:59");
});

test("开关偏好持久化：自定义考试未携带该字段时保留已保存的偏好", () => {
  const { document, api, localStorage } = loadWithAudio();

  api.applyCustomExamConfig(makeCustomExam());
  api.toggleDisplaySetting("showSectionAlert", false);
  assert.strictEqual(
    JSON.parse(localStorage.getItem("displaySettings")).showSectionAlert,
    false,
  );

  // 自定义考试的 displaySettings 未携带 showSectionAlert
  api.applyCustomExamConfig(
    makeCustomExam({
      showCurrentTime: true,
      showCountdownTimer: true,
      showSectionTimer: true,
    }),
  );

  assert.strictEqual(api.showSectionAlert, false, "应沿用已保存的开关偏好");
  assert.strictEqual(
    JSON.parse(localStorage.getItem("displaySettings")).showSectionAlert,
    false,
    "再次保存设置时不应丢失开关偏好",
  );
  assert.strictEqual(
    document.getElementById("inlineShowSectionAlert").checked,
    false,
    "复选框状态应与全局设置一致",
  );

  // 显式携带该字段时以自定义考试配置为准
  api.applyCustomExamConfig(
    makeCustomExam({
      showCurrentTime: true,
      showCountdownTimer: true,
      showSectionTimer: true,
      showSectionAlert: true,
    }),
  );
  assert.strictEqual(api.showSectionAlert, true);

  // 「重置显示设置」恢复为全部显示
  api.toggleDisplaySetting("showSectionAlert", false);
  api.resetDisplaySettings();
  assert.strictEqual(api.showSectionAlert, true);
});

test("刷新后从 localStorage 恢复开关状态", () => {
  const { api, localStorage } = loadWithAudio();
  api.toggleDisplaySetting("showSectionAlert", false);
  const saved = localStorage.getItem("displaySettings");

  // 模拟刷新：全新的沙箱，仅保留 localStorage 中的设置
  const fresh = loadExamClockScript();
  fresh.localStorage.setItem("displaySettings", saved);
  fresh.api.initializeDisplaySettings();

  assert.strictEqual(fresh.api.showSectionAlert, false);
  assert.strictEqual(
    fresh.document.getElementById("inlineShowSectionAlert").checked,
    false,
  );
});

test("页面标记与脚本联动：复选框 id 与 toggleDisplaySetting 参数一致", () => {
  const repoRoot = path.resolve(__dirname, "..");
  const html = fs.readFileSync(path.join(repoRoot, "index.html"), "utf8");
  const script = fs.readFileSync(path.join(repoRoot, "js", "script.js"), "utf8");

  assert.match(html, /id="inlineShowSectionAlert"/);
  assert.match(
    html,
    /toggleDisplaySetting\(\s*'showSectionAlert',\s*this\.checked\s*\)/,
  );
  assert.ok(html.includes("<span>环节切换提示音</span>"));
  assert.match(
    script,
    /getElementById\(\s*"inlineShowSectionAlert",?\s*\)/,
    "updateDisplaySettings 应同步该复选框状态",
  );
  assert.match(
    script,
    /class="section-change-toast"|"section-change-toast"|section-change-toast/,
    "脚本应使用 .section-change-toast 视觉提示样式",
  );
});



