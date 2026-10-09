"use strict";

/**
 * 测试目录入口。
 *
 * 背景：Node 22 的测试运行器会把显式传入的路径原样交给子进程执行
 * （即 `node --test tests` 实际会 spawn `node <repo>\tests`），
 * 目录本身不是可执行模块，于是报 `Cannot find module '...\tests'`。
 * 该入口文件通过 CommonJS 的目录解析（`tests` -> `tests/index.js`）
 * 被加载，从而把同目录下所有 `*.test.js` 引入测试运行器，
 * 使 `node --test tests`、`node --test`、`node --test "tests/*.test.js"` 三者等效可用。
 */

const fs = require("node:fs");
const path = require("node:path");

fs.readdirSync(__dirname)
  .filter((file) => file.endsWith(".test.js"))
  .sort()
  .forEach((file) => {
    require(path.join(__dirname, file));
  });
