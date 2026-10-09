"use strict";

/**
 * 纯函数单元测试。
 *
 * 覆盖：
 *  - js/script.js      formatTime（第 722 行附近）
 *  - js/script.js      calculateEndTime（第 1473 行附近）
 *  - js/custom-exam.js validateAndFormatTime（第 957 行附近）
 *  - js/script.js      buildCustomExamSections（T1 抽离：自定义考试 → 环节链）
 *
 * 全部使用 Node.js 内置的 node:test + node:assert，零第三方依赖、完全离线。
 * 运行：npm test（等价于 node --test tests/index.js）
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadExamClockScript, loadCustomExamScript } = require("./dom-stub");

// ---------------------------------------------------------------------------
// formatTime（js/script.js）
// ---------------------------------------------------------------------------

test("formatTime：0 秒 → 00:00:00，7325 秒 → 02:02:05", () => {
  const { api } = loadExamClockScript();

  assert.strictEqual(api.formatTime(0), "00:00:00");
  assert.strictEqual(api.formatTime(7325), "02:02:05");
});

test("formatTime：时/分/秒均补零并正确处理进位", () => {
  const { api } = loadExamClockScript();

  assert.strictEqual(api.formatTime(59), "00:00:59");
  assert.strictEqual(api.formatTime(60), "00:01:00");
  assert.strictEqual(api.formatTime(3600), "01:00:00");
  assert.strictEqual(api.formatTime(86399), "23:59:59");
});

test("formatTime：负数输入保持既有实现行为（原样计算、不做钳制）", () => {
  const { api } = loadExamClockScript();

  // 产品代码未对负数做特殊处理（各字段直接取整/取余，负数会带符号）。
  // 为不改变浏览器内既有行为，这里按实际输出断言，而非强行改成 0 或抛错。
  assert.strictEqual(api.formatTime(-1), "-1:-1:-1");
  assert.strictEqual(api.formatTime(-60), "-1:-1:00");
  assert.strictEqual(api.formatTime(-7200), "-2:00:00");
});

// ---------------------------------------------------------------------------
// calculateEndTime（js/script.js）
// ---------------------------------------------------------------------------

test("calculateEndTime：09:00 + 120 分钟 → 11:00", () => {
  const { api } = loadExamClockScript();

  assert.strictEqual(api.calculateEndTime("09:00", 120), "11:00");
});

test("calculateEndTime：23:30 + 120 分钟 → 次日 01:30", () => {
  const { api } = loadExamClockScript();

  assert.strictEqual(api.calculateEndTime("23:30", 120), "01:30 (次日)");
});

test("calculateEndTime：00:00 + 0 分钟 → 00:00", () => {
  const { api } = loadExamClockScript();

  assert.strictEqual(api.calculateEndTime("00:00", 0), "00:00");
});

test("calculateEndTime：跨日/不跨日/零时长的其它边界", () => {
  const { api } = loadExamClockScript();

  assert.strictEqual(api.calculateEndTime("08:45", 15), "09:00");
  assert.strictEqual(api.calculateEndTime("22:00", 120), "00:00 (次日)");
  assert.strictEqual(api.calculateEndTime("09:30", 0), "09:30");
});

// ---------------------------------------------------------------------------
// validateAndFormatTime（js/custom-exam.js）
// ---------------------------------------------------------------------------

test("validateAndFormatTime：09:30 / 9:30 / 0930 均规范化为 09:30", () => {
  const { api } = loadCustomExamScript();

  assert.strictEqual(api.validateAndFormatTime("09:30"), "09:30");
  assert.strictEqual(api.validateAndFormatTime("9:30"), "09:30");
  assert.strictEqual(api.validateAndFormatTime("0930"), "09:30");
});

test("validateAndFormatTime：25:00 / 24:00 / abc / 空字符串 / null 均返回 null", () => {
  const { api } = loadCustomExamScript();

  const invalidInputs = ["25:00", "24:00", "abc", "", null];
  for (const input of invalidInputs) {
    assert.strictEqual(
      api.validateAndFormatTime(input),
      null,
      `输入 ${JSON.stringify(input)} 应返回 null`,
    );
  }
});

test("validateAndFormatTime：合法输入补零，其余越界/空白输入返回 null 且不抛错", () => {
  const { api } = loadCustomExamScript();

  assert.strictEqual(api.validateAndFormatTime("0:00"), "00:00");
  assert.strictEqual(api.validateAndFormatTime("23:59"), "23:59");

  assert.doesNotThrow(() => {
    assert.strictEqual(api.validateAndFormatTime(undefined), null);
    assert.strictEqual(api.validateAndFormatTime("   "), null);
    assert.strictEqual(api.validateAndFormatTime("9:60"), null);
    assert.strictEqual(api.validateAndFormatTime("23:60"), null);
  });
});

// ---------------------------------------------------------------------------
// buildCustomExamSections（T1 抽离的自定义考试 → 环节链纯函数）
// ---------------------------------------------------------------------------

/**
 * T1 回归 fixture：
 * 科目一 90 分钟（计入）+ 休息 10 分钟（不计入）+ 科目二 30 分钟（计入）。
 * 因此计入总时长 = 90 + 30 = 120 分钟。
 */
function makeT1Fixture() {
  return {
    name: "T1 回归：科目一 / 休息 / 科目二",
    startTime: "09:00",
    date: "2026-06-20",
    sections: [
      { name: "科目一", duration: 90, description: "语文", countInTotal: true },
      {
        name: "休息",
        duration: 10,
        description: "课间休息",
        countInTotal: false,
      },
      { name: "科目二", duration: 30, description: "数学", countInTotal: true },
    ],
  };
}

test("buildCustomExamSections（T1）：科目一 90 + 休息 10（不计入）+ 科目二 30 → 总时长 120 分钟", () => {
  const { api } = loadExamClockScript();
  const { sections, totalMinutes } = api.buildCustomExamSections(
    makeT1Fixture(),
  );

  assert.strictEqual(totalMinutes, 120);
  assert.strictEqual(sections.length, 4);
});

test("buildCustomExamSections（T1）：逐环节校验 start / end / realTime", () => {
  const { api } = loadExamClockScript();
  const { sections } = api.buildCustomExamSections(makeT1Fixture());

  // [名称, start, end, realTime]
  // 说明：sections 来自 vm 沙箱，其数组原型与宿主不同，
  // 因此先用宿主的 Array.from 转成宿主数组再比较（deepStrictEqual 会校验原型）。
  assert.deepStrictEqual(
    Array.from(sections, (section) => [
      section.name,
      section.start,
      section.end,
      section.realTime,
    ]),
    [
      ["科目一", 0, 90, "09:00-10:30"],
      ["休息", 90, 90, "10:30-10:30"],
      ["科目二", 90, 120, "10:30-11:00"],
      ["考试结束", 120, 120, "11:00"],
    ],
  );

  // 休息环节不计入总时间 → 零时长占位；考试结束环节无时长
  assert.strictEqual(sections[0].duration, 90);
  assert.strictEqual(sections[1].countInTotal, false);
  assert.strictEqual(sections[1].duration, 0);
  assert.strictEqual(sections[2].duration, 30);
  assert.strictEqual(sections[3].duration, 0);
});

test("buildCustomExamSections（T1）：考试结束位置的起始时间等于 120 分钟", () => {
  const { api } = loadExamClockScript();
  const { sections, totalMinutes } = api.buildCustomExamSections(
    makeT1Fixture(),
  );

  const endSection = sections[sections.length - 1];
  assert.strictEqual(endSection.name, "考试结束");
  assert.strictEqual(endSection.start, 120);
  assert.strictEqual(endSection.end, 120);
  assert.strictEqual(endSection.start, totalMinutes);
});

test("buildCustomExamSections：纯函数，不修改传入的 fixture", () => {
  const { api } = loadExamClockScript();
  const fixture = makeT1Fixture();
  const snapshot = JSON.stringify(fixture);

  api.buildCustomExamSections(fixture);

  assert.strictEqual(JSON.stringify(fixture), snapshot);
});

test("buildCustomExamSections：旧数据缺少 countInTotal 字段时默认计入总时间", () => {
  const { api } = loadExamClockScript();
  const { sections, totalMinutes } = api.buildCustomExamSections({
    startTime: "09:00",
    sections: [
      { name: "A", duration: 10, description: "" },
      { name: "B", duration: 20, description: "" },
    ],
  });

  assert.strictEqual(sections[0].countInTotal, true);
  assert.strictEqual(totalMinutes, 30);
  assert.deepStrictEqual(
    Array.from(sections, (section) => [section.name, section.start, section.end]),
    [
      ["A", 0, 10],
      ["B", 10, 30],
      ["考试结束", 30, 30],
    ],
  );
});

test("buildCustomExamSections 防御性：全部 countInTotal=false 时不抛错且总时长为 0", () => {
  const { api } = loadExamClockScript();
  const fixture = {
    name: "T1 防御性：全部不计入",
    startTime: "09:00",
    date: "2026-06-20",
    sections: [
      { name: "休息A", duration: 10, description: "", countInTotal: false },
      { name: "休息B", duration: 20, description: "", countInTotal: false },
    ],
  };

  let result;
  assert.doesNotThrow(() => {
    result = api.buildCustomExamSections(fixture);
  });

  assert.strictEqual(result.totalMinutes, 0);
  assert.deepStrictEqual(
    Array.from(result.sections, (section) => [
      section.name,
      section.start,
      section.end,
      section.realTime,
    ]),
    [
      ["休息A", 0, 0, "09:00-09:00"],
      ["休息B", 0, 0, "09:00-09:00"],
      ["考试结束", 0, 0, "09:00"],
    ],
  );
});

test("applyCustomExamConfig 复用纯函数：环节链与总时长一致（浏览器既有行为未变）", () => {
  const { document, api } = loadExamClockScript();
  const fixture = makeT1Fixture();

  const expected = api.buildCustomExamSections(
    JSON.parse(JSON.stringify(fixture)),
  );

  api.applyCustomExamConfig(fixture);

  const pick = (list) =>
    Array.from(list, (section) => [
      section.name,
      section.start,
      section.duration,
      section.end,
      section.realTime,
      section.countInTotal,
    ]);

  assert.deepStrictEqual(pick(api.examSections), pick(expected.sections));
  assert.strictEqual(api.totalTime, expected.totalMinutes * 60);
  assert.strictEqual(api.timeLeft, expected.totalMinutes * 60);
  assert.strictEqual(api.formatTime(api.timeLeft), "02:00:00");
  assert.strictEqual(
    document.getElementById("examTimeRange").textContent,
    "09:00 - 11:00",
  );
});

