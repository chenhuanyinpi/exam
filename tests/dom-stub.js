"use strict";

/**
 * 极简 DOM / localStorage 桩 + vm 沙箱加载器。
 *
 * 目的：在 Node 环境下直接加载 `js/script.js`（浏览器脚本，无模块导出），
 * 以对 `applyCustomExamConfig` 等函数做自动化回归测试，无需引入任何第三方依赖。
 */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createElement(id) {
  let html = "";
  const children = [];
  const classes = new Set();

  const element = {
    id: id || "",
    className: "",
    textContent: "",
    value: "",
    checked: false,
    disabled: false,
    style: {},
    dataset: {},
    children: children,
    parentNode: null,
    // 供 flashCurrentSection() 读取（强制重排），真实值为数字
    offsetWidth: 0,
    classList: {
      add(...names) {
        names.forEach((name) => classes.add(name));
      },
      remove(...names) {
        names.forEach((name) => classes.delete(name));
      },
      toggle(name, force) {
        const shouldAdd = force === undefined ? !classes.has(name) : !!force;
        if (shouldAdd) classes.add(name);
        else classes.delete(name);
        return shouldAdd;
      },
      contains(name) {
        return classes.has(name);
      },
    },
    setAttribute() {},
    getAttribute() {
      return null;
    },
    hasAttribute() {
      return false;
    },
    removeAttribute() {},
    appendChild(child) {
      children.push(child);
      if (child && typeof child === "object") child.parentNode = element;
      return child;
    },
    insertBefore(child) {
      children.push(child);
      if (child && typeof child === "object") child.parentNode = element;
      return child;
    },
    removeChild(child) {
      const index = children.indexOf(child);
      if (index >= 0) children.splice(index, 1);
      if (child && typeof child === "object") child.parentNode = null;
      return child;
    },
    // 从父节点上摘除自身（环节切换浮层提示会在关闭开关时调用）
    remove() {
      if (element.parentNode && typeof element.parentNode.removeChild === "function") {
        element.parentNode.removeChild(element);
      }
      element.parentNode = null;
    },
    addEventListener() {},
    removeEventListener() {},
    closest() {
      return element;
    },
    querySelector() {
      return createElement();
    },
    querySelectorAll() {
      return [];
    },
    focus() {},
    scrollIntoView() {},
  };

  // innerHTML 设置为字符串时同时清空子节点，模拟真实 DOM 行为
  Object.defineProperty(element, "innerHTML", {
    get() {
      return html;
    },
    set(next) {
      html = String(next);
      children.length = 0;
    },
    enumerable: true,
  });

  return element;
}

function createDocument() {
  const byId = new Map();
  const bySelector = new Map();

  return {
    getElementById(id) {
      if (!byId.has(id)) byId.set(id, createElement(id));
      return byId.get(id);
    },
    querySelector(selector) {
      if (!bySelector.has(selector)) {
        bySelector.set(selector, createElement(selector));
      }
      return bySelector.get(selector);
    },
    querySelectorAll() {
      return [];
    },
    createElement(tag) {
      return createElement(tag);
    },
    addEventListener() {},
    removeEventListener() {},
    body: createElement("body"),
  };
}

function createLocalStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

/**
 * 加载 js/script.js 并暴露测试所需的内部函数与全局状态。
 * @param {string} [scriptRelativePath] 相对仓库根目录的脚本路径
 * @param {{ globals?: object }} [options] 额外注入到沙箱全局对象上的成员
 *        （例如注入一个假的 `AudioContext` 以测试环节切换提示音）
 * @returns {{ document: object, localStorage: object, api: object, sandbox: object }}
 */
function loadExamClockScript(
  scriptRelativePath = path.join("js", "script.js"),
  options = {},
) {
  const scriptPath = path.resolve(__dirname, "..", scriptRelativePath);
  const source = fs.readFileSync(scriptPath, "utf8");

  // 追加导出行（与 script.js 处于同一词法作用域，可捕获 let/const 绑定）
  const exportSnippet = `
;globalThis.__examClockTest = {
  applyCustomExamConfig: applyCustomExamConfig,
  updateExamConfig: updateExamConfig,
  updateSectionList: updateSectionList,
  updateSectionOptions: updateSectionOptions,
  handleSectionChange: handleSectionChange,
  skipToSelectedSection: skipToSelectedSection,
  nextSection: nextSection,
  startExam: startExam,
  updateTimer: updateTimer,
  resetExam: resetExam,
  formatTime: formatTime,
  calculateEndTime: calculateEndTime,
  buildCustomExamSections: buildCustomExamSections,
  toggleDisplaySetting: toggleDisplaySetting,
  initializeDisplaySettings: initializeDisplaySettings,
  applyDisplaySettings: applyDisplaySettings,
  resetDisplaySettings: resetDisplaySettings,
  updateDisplaySettings: updateDisplaySettings,
  notifySectionChange: notifySectionChange,
  clearSectionChangeVisuals: clearSectionChangeVisuals,
  getSectionIndexForTime: getSectionIndexForTime,
  get examSections() { return examSections; },
  get officialExams() { return officialExams; },
  get totalTime() { return totalTime; },
  get timeLeft() { return timeLeft; },
  set timeLeft(value) { timeLeft = value; },
  get isRunning() { return isRunning; },
  set isRunning(value) { isRunning = value; },
  get startTimeStamp() { return startTimeStamp; },
  set startTimeStamp(value) { startTimeStamp = value; },
  get elapsedBeforeLastStart() { return elapsedBeforeLastStart; },
  set elapsedBeforeLastStart(value) { elapsedBeforeLastStart = value; },
  get showSectionAlert() { return showSectionAlert; },
  set showSectionAlert(value) { showSectionAlert = value; },
  get lastNotifiedSectionIndex() { return lastNotifiedSectionIndex; }
};`;

  const document = createDocument();
  const localStorage = createLocalStorage();

  const sandbox = {
    console: console,
    document: document,
    localStorage: localStorage,
    setInterval: function () {
      return 0;
    },
    clearInterval: function () {},
    setTimeout: function () {
      return 0;
    },
    clearTimeout: function () {},
    alert: function () {},
    navigator: { userAgent: "node" },
  };
  sandbox.window = sandbox;

  // 注入测试提供的额外全局成员（如假 AudioContext）
  Object.assign(sandbox, options.globals || {});

  const context = vm.createContext(sandbox);
  vm.runInContext(source + exportSnippet, context, { filename: scriptPath });

  return {
    document: document,
    localStorage: localStorage,
    api: context.__examClockTest,
    sandbox: sandbox,
  };
}

/**
 * 加载 js/custom-exam.js 并暴露测试所需的内部函数。
 *
 * 该脚本同样是浏览器脚本（无模块导出），且会在顶层注册 document 事件监听，
 * 因此与 script.js 一致，在 vm 沙箱中加载并注入 DOM / localStorage 桩。
 *
 * @param {string} [scriptRelativePath] 相对仓库根目录的脚本路径
 * @param {{ globals?: object }} [options] 额外注入到沙箱全局对象上的成员
 * @returns {{ document: object, localStorage: object, api: object, sandbox: object }}
 */
function loadCustomExamScript(
  scriptRelativePath = path.join("js", "custom-exam.js"),
  options = {},
) {
  const scriptPath = path.resolve(__dirname, "..", scriptRelativePath);
  const source = fs.readFileSync(scriptPath, "utf8");

  // 追加导出行（与 custom-exam.js 处于同一词法作用域，可捕获函数声明）
  const exportSnippet = `
;globalThis.__customExamTest = {
  validateAndFormatTime: validateAndFormatTime
};`;

  const document = createDocument();
  const localStorage = createLocalStorage();

  const sandbox = {
    console: console,
    document: document,
    localStorage: localStorage,
    setInterval: function () {
      return 0;
    },
    clearInterval: function () {},
    setTimeout: function () {
      return 0;
    },
    clearTimeout: function () {},
    alert: function () {},
    confirm: function () {
      return true;
    },
    navigator: { userAgent: "node" },
  };
  sandbox.window = sandbox;

  // 注入测试提供的额外全局成员
  Object.assign(sandbox, options.globals || {});

  const context = vm.createContext(sandbox);
  vm.runInContext(source + exportSnippet, context, { filename: scriptPath });

  return {
    document: document,
    localStorage: localStorage,
    api: context.__customExamTest,
    sandbox: sandbox,
  };
}

module.exports = { loadExamClockScript, loadCustomExamScript };
