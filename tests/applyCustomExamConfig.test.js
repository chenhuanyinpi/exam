"use strict";

/**
 * 针对 `applyCustomExamConfig` 中「不计入总时间（countInTotal）」环节的回归测试。
 *
 * 运行：node --test tests
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadExamClockScript } = require("./dom-stub");

/**
 * 构造一个包含两个「不计入总时间」环节的自定义考试配置。
 * 计入时长：10 + 60 = 70 分钟；不计入：20 与 15 分钟（不应计入链条推进）。
 */
function makeCustomExam() {
  return {
    id: 101,
    name: "自定义：含休息的考试",
    startTime: "09:00",
    date: "2026-06-20",
    totalMinutes: 70,
    displaySettings: {
      showCurrentTime: true,
      showCountdownTimer: true,
      showSectionTimer: true,
    },
    sections: [
      { name: "考前准备", duration: 10, description: "发卷", countInTotal: true },
      {
        name: "课间休息",
        duration: 20,
        description: "休息",
        countInTotal: false,
      },
      { name: "第一部分", duration: 60, description: "作答", countInTotal: true },
      {
        name: "中场休息",
        duration: 15,
        description: "休息",
        countInTotal: false,
      },
    ],
  };
}

test("不计入环节在环节链中为零时长占位，位置等于其前置计入时长之和", () => {
  const { api } = loadExamClockScript();
  api.applyCustomExamConfig(makeCustomExam());
  const sections = api.examSections;

  assert.strictEqual(sections.length, 5);

  // 第一个计入环节
  assert.strictEqual(sections[0].name, "考前准备");
  assert.strictEqual(sections[0].countInTotal, true);
  assert.strictEqual(sections[0].start, 0);
  assert.strictEqual(sections[0].end, 10);
  assert.strictEqual(sections[0].duration, 10);

  // 第一个不计入环节：零时长占位，位置 = 前置计入之和（10）
  assert.strictEqual(sections[1].name, "课间休息");
  assert.strictEqual(sections[1].countInTotal, false);
  assert.strictEqual(sections[1].start, 10);
  assert.strictEqual(sections[1].end, 10);
  assert.strictEqual(sections[1].duration, 0);

  // 紧随其后的计入环节从占位处继续拼接
  assert.strictEqual(sections[2].name, "第一部分");
  assert.strictEqual(sections[2].countInTotal, true);
  assert.strictEqual(sections[2].start, 10);
  assert.strictEqual(sections[2].end, 70);

  // 第二个不计入环节：位置 = 10 + 60 = 70
  assert.strictEqual(sections[3].name, "中场休息");
  assert.strictEqual(sections[3].countInTotal, false);
  assert.strictEqual(sections[3].start, 70);
  assert.strictEqual(sections[3].end, 70);
});

test("考试结束环节 start === end === totalMinutes，且与标题区/总时间统计一致", () => {
  const { document, api } = loadExamClockScript();
  const exam = makeCustomExam();
  api.applyCustomExamConfig(exam);

  const sections = api.examSections;
  const endSection = sections[sections.length - 1];

  assert.strictEqual(endSection.name, "考试结束");
  assert.strictEqual(endSection.start, exam.totalMinutes);
  assert.strictEqual(endSection.end, exam.totalMinutes);

  // totalTime / 倒计时初值 / 标题区 / 总分钟统计 严格一致
  assert.strictEqual(api.totalTime, exam.totalMinutes * 60);
  assert.strictEqual(api.timeLeft, exam.totalMinutes * 60);
  assert.strictEqual(api.formatTime(api.timeLeft), "01:10:00");
  assert.strictEqual(
    document.getElementById("totalTime").textContent,
    exam.totalMinutes,
  );
  assert.strictEqual(
    document.getElementById("remainingTime").textContent,
    exam.totalMinutes,
  );
  assert.strictEqual(
    document.getElementById("examTimeRange").textContent,
    "09:00 - 10:10",
  );
});

test("环节链所有环节满足 0 <= start <= end <= totalMinutes", () => {
  const { api } = loadExamClockScript();
  api.applyCustomExamConfig(makeCustomExam());

  const totalMinutes = api.totalTime / 60;
  const sections = api.examSections;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    assert.ok(section.start >= 0, `section[${i}] start >= 0`);
    assert.ok(section.start <= section.end, `section[${i}] start <= end`);
    assert.ok(section.end <= totalMinutes, `section[${i}] end <= totalMinutes`);
  }
});

test("任意跳转后 timeLeft 始终位于 [0, totalTime]，绝不出现负数倒计时", () => {
  const { document, api } = loadExamClockScript();
  api.applyCustomExamConfig(makeCustomExam());

  const select = document.getElementById("sectionSelect");

  for (let i = 0; i < api.examSections.length; i++) {
    select.value = String(i);

    api.skipToSelectedSection();
    assert.ok(api.timeLeft >= 0, `skipToSelectedSection -> ${i} 不应为负`);
    assert.ok(
      api.timeLeft <= api.totalTime,
      `skipToSelectedSection -> ${i} 不越界`,
    );
    assert.ok(
      !api.formatTime(api.timeLeft).startsWith("-"),
      `skipToSelectedSection -> ${i} 倒计时不应出现负号`,
    );

    api.handleSectionChange();
    assert.ok(api.timeLeft >= 0, `handleSectionChange -> ${i} 不应为负`);
    assert.ok(
      api.timeLeft <= api.totalTime,
      `handleSectionChange -> ${i} 不越界`,
    );
  }
});

test("nextSection 连续跳转不产生越界或负值", () => {
  const { document, api } = loadExamClockScript();
  api.applyCustomExamConfig(makeCustomExam());

  const select = document.getElementById("sectionSelect");
  select.value = "0";
  api.skipToSelectedSection();
  api.isRunning = true;

  for (let step = 0; step < 8; step++) {
    api.nextSection();
    assert.ok(api.timeLeft >= 0, `step ${step} 不应为负`);
    assert.ok(api.timeLeft <= api.totalTime, `step ${step} 不越界`);
    assert.ok(
      !api.formatTime(api.timeLeft).startsWith("-"),
      `step ${step} 倒计时不应出现负号`,
    );
  }
});

test("自然运行到超时后 timeLeft 被钳制为 0（00:00:00）", () => {
  const { api } = loadExamClockScript();
  api.applyCustomExamConfig(makeCustomExam());

  api.isRunning = true;
  api.elapsedBeforeLastStart = 0;
  api.startTimeStamp = Date.now() - (api.totalTime + 600) * 1000;
  api.updateTimer();

  assert.strictEqual(api.timeLeft, 0);
  assert.strictEqual(api.formatTime(api.timeLeft), "00:00:00");
});

test("时间线保留占位环节并显示「休息（不计时）」，其它环节保持原格式", () => {
  const { document, api } = loadExamClockScript();
  api.applyCustomExamConfig(makeCustomExam());

  const timeline = document.getElementById("timeline");
  const cards = timeline.children.map((child) => child.innerHTML);

  assert.strictEqual(cards.length, api.examSections.length);
  assert.strictEqual(
    cards.filter((html) => html.includes("休息（不计时）")).length,
    2,
    "两个不计入环节都应保留在时间线中",
  );
  assert.ok(cards.some((html) => html.includes("考前准备 (10min)")));
  assert.ok(cards.some((html) => html.includes("考试结束 (0min)")));

  const selectHTML = document.getElementById("sectionSelect").innerHTML;
  assert.strictEqual(
    (selectHTML.match(/休息（不计时）/g) || []).length,
    2,
    "下拉框同样保留两个占位环节",
  );
});

test("旧数据缺少 countInTotal 字段时默认计入总时间", () => {
  const { api } = loadExamClockScript();
  const exam = makeCustomExam();
  exam.sections = [
    { name: "A", duration: 10, description: "" },
    { name: "B", duration: 20, description: "" },
  ];
  exam.totalMinutes = 30;

  api.applyCustomExamConfig(exam);
  const sections = api.examSections;

  assert.strictEqual(sections[0].countInTotal, true);
  assert.strictEqual(sections[1].start, 10);
  assert.strictEqual(sections[1].end, 30);
  assert.strictEqual(sections[2].name, "考试结束");
  assert.strictEqual(sections[2].start, 30);
  assert.strictEqual(sections[2].end, 30);
});

test("applyCustomExamConfig 不修改传入的种子数据", () => {
  const { api } = loadExamClockScript();
  const exam = makeCustomExam();
  const snapshot = JSON.stringify(exam);

  api.applyCustomExamConfig(exam);

  assert.strictEqual(JSON.stringify(exam), snapshot);
});

test("官方预设（CET-4/CET-6/9 个高考）渲染逻辑不受影响", () => {
  const { document, api } = loadExamClockScript();
  const official = api.officialExams;
  const keys = Object.keys(official);

  assert.ok(keys.length >= 11, "应包含 CET-4、CET-6 与 9 个高考预设");

  for (const key of keys) {
    const preset = official[key];
    api.updateExamConfig(preset);

    const timeline = document.getElementById("timeline");
    const timelineHTML = timeline.children
      .map((child) => child.innerHTML)
      .join("");
    const selectHTML = document.getElementById("sectionSelect").innerHTML;

    assert.ok(
      !timelineHTML.includes("休息（不计时）"),
      `${key} 的时间线不应出现休息占位`,
    );
    assert.ok(
      !selectHTML.includes("休息（不计时）"),
      `${key} 的下拉框不应出现休息占位`,
    );

    const firstSection = preset.sections[0];
    assert.ok(
      timelineHTML.includes(
        `${firstSection.name} (${firstSection.duration}min)`,
      ),
      `${key} 首个环节标题应保持原格式`,
    );
    assert.strictEqual(api.totalTime, preset.totalTime, `${key} 总时长不变`);
  }
});
