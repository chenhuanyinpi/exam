// CET-4 考试环节配置
const cet4Sections = [
  {
    name: "考前准备",
    start: 0,
    duration: 10,
    end: 10,
    description: "发卷、填写个人信息、贴条形码",
    realTime: "9:00-9:10",
  },
  {
    name: "写作",
    start: 10,
    duration: 30,
    end: 40,
    description: "作文写作（不能翻看试题册）",
    realTime: "9:10-9:40",
  },
  {
    name: "听力",
    start: 40,
    duration: 25,
    end: 65,
    description: "听力理解（边听边涂答题卡1）",
    realTime: "9:40-10:05",
  },
  {
    name: "收答题卡1",
    start: 65,
    duration: 5,
    end: 70,
    description: "听力结束后立即收答题卡1",
    realTime: "10:05-10:10",
  },
  {
    name: "阅读理解 + 翻译",
    start: 70,
    duration: 70,
    end: 140,
    description: "作答在答题卡2（阅读40min+翻译30min）",
    realTime: "10:10-11:20",
  },
  {
    name: "考试结束",
    start: 140,
    duration: 0,
    end: 140,
    description: "收答题卡2和试题册",
    realTime: "11:20",
  },
];

// CET-6 考试环节配置
const cet6Sections = [
  {
    name: "考前准备",
    start: 0,
    duration: 10,
    end: 10,
    description: "发卷、填写个人信息、贴条形码",
    realTime: "15:00-15:10",
  },
  {
    name: "写作",
    start: 10,
    duration: 30,
    end: 40,
    description: "作文写作（不能翻看试题册）",
    realTime: "15:10-15:40",
  },
  {
    name: "听力",
    start: 40,
    duration: 30,
    end: 70,
    description: "听力理解（边听边涂答题卡1）",
    realTime: "15:40-16:10",
  },
  {
    name: "收答题卡1",
    start: 70,
    duration: 5,
    end: 75,
    description: "听力结束后立即收答题卡1",
    realTime: "16:10-16:15",
  },
  {
    name: "阅读理解 + 翻译",
    start: 75,
    duration: 70,
    end: 145,
    description: "作答在答题卡2（阅读40min+翻译30min）",
    realTime: "16:15-17:25",
  },
  {
    name: "考试结束",
    start: 145,
    duration: 0,
    end: 145,
    description: "收答题卡2和试题册",
    realTime: "17:25",
  },
];

// ==================== 高考预设（广东 3+1+2 模式）====================

// 6月7日 - 语文 9:00-11:30（150分钟）
const gaokaoYuwen = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "9:00-9:05",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "9:05-9:10",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 140,
    end: 150,
    description: "现代文阅读、古代诗文、语言文字运用、写作",
    realTime: "9:10-11:30",
  },
  {
    name: "考试结束",
    start: 150,
    duration: 0,
    end: 150,
    description: "收试卷和答题卡",
    realTime: "11:30",
  },
];

// 6月7日 - 数学 15:00-17:00（120分钟）
const gaokaoShuxue = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "15:00-15:05",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "15:05-15:10",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 110,
    end: 120,
    description: "选择题、填空题、解答题",
    realTime: "15:10-17:00",
  },
  {
    name: "考试结束",
    start: 120,
    duration: 0,
    end: 120,
    description: "收试卷和答题卡",
    realTime: "17:00",
  },
];

// 6月8日 - 物理 9:00-10:15（75分钟）
const gaokaoWuli = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "9:00-9:05",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "9:05-9:10",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 65,
    end: 75,
    description: "选择题、实验题、计算题",
    realTime: "9:10-10:15",
  },
  {
    name: "考试结束",
    start: 75,
    duration: 0,
    end: 75,
    description: "收试卷和答题卡",
    realTime: "10:15",
  },
];

// 6月8日 - 历史 9:00-10:15（75分钟）
const gaokaoLishi = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "9:00-9:05",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "9:05-9:10",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 65,
    end: 75,
    description: "选择题、材料分析题、论述题",
    realTime: "9:10-10:15",
  },
  {
    name: "考试结束",
    start: 75,
    duration: 0,
    end: 75,
    description: "收试卷和答题卡",
    realTime: "10:15",
  },
];

// 6月8日 - 外语 15:00-17:00（120分钟）
const gaokaoWaiyu = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "15:00-15:05",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "15:05-15:10",
  },
  {
    name: "听力",
    start: 10,
    duration: 20,
    end: 30,
    description: "听力理解（边听边涂答题卡）",
    realTime: "15:10-15:30",
  },
  {
    name: "笔试",
    start: 30,
    duration: 90,
    end: 120,
    description: "阅读理解、完形填空、语法填空、书面表达",
    realTime: "15:30-17:00",
  },
  {
    name: "考试结束",
    start: 120,
    duration: 0,
    end: 120,
    description: "收试卷和答题卡",
    realTime: "17:00",
  },
];

// 6月9日 - 化学 8:30-9:45（75分钟）
const gaokaoHuaxue = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "8:30-8:35",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "8:35-8:40",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 65,
    end: 75,
    description: "选择题、非选择题",
    realTime: "8:40-9:45",
  },
  {
    name: "考试结束",
    start: 75,
    duration: 0,
    end: 75,
    description: "收试卷和答题卡",
    realTime: "9:45",
  },
];

// 6月9日 - 地理 11:00-12:15（75分钟）
const gaokaoDili = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "11:00-11:05",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "11:05-11:10",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 65,
    end: 75,
    description: "选择题、综合题",
    realTime: "11:10-12:15",
  },
  {
    name: "考试结束",
    start: 75,
    duration: 0,
    end: 75,
    description: "收试卷和答题卡",
    realTime: "12:15",
  },
];

// 6月9日 - 思想政治 14:30-15:45（75分钟）
const gaokaoZhengzhi = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "14:30-14:35",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "14:35-14:40",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 65,
    end: 75,
    description: "选择题、非选择题",
    realTime: "14:40-15:45",
  },
  {
    name: "考试结束",
    start: 75,
    duration: 0,
    end: 75,
    description: "收试卷和答题卡",
    realTime: "15:45",
  },
];

// 6月9日 - 生物学 17:00-18:15（75分钟）
const gaokaoShengwu = [
  {
    name: "考前准备1",
    start: 0,
    duration: 5,
    end: 5,
    description: "发放答题卡、草稿纸、条形码，填写答题卡上个人信息",
    realTime: "17:00-17:05",
  },
  {
    name: "考前准备2",
    start: 5,
    duration: 5,
    end: 10,
    description: "发放试卷，不允许作答",
    realTime: "17:05-17:10",
  },
  {
    name: "考试作答",
    start: 10,
    duration: 65,
    end: 75,
    description: "选择题、非选择题",
    realTime: "17:10-18:15",
  },
  {
    name: "考试结束",
    start: 75,
    duration: 0,
    end: 75,
    description: "收试卷和答题卡",
    realTime: "18:15",
  },
];

// 官方考试预设多级分类
const officialPresetCategories = [
  {
    name: "CET",
    items: ["cet4", "cet6"]
  },
  {
    name: "高考",
    subcategories: [
      {
        name: "6月7日",
        items: ["gaokao_yuwen", "gaokao_shuxue"]
      },
      {
        name: "6月8日",
        items: ["gaokao_wuli", "gaokao_lishi", "gaokao_waiyu"]
      },
      {
        name: "6月9日",
        items: ["gaokao_huaxue", "gaokao_dili", "gaokao_zhengzhi", "gaokao_shengwu"]
      }
    ]
  }
];

// 官方考试预设
const officialExams = {
  cet4: {
    name: "CET-4",
    sections: cet4Sections,
    totalTime: 140 * 60,
    examDate: "2026年6月13日上午",
    examTimeRange: "9:00 - 11:20",
    examStartTime: { hours: 9, minutes: 0 },
    targetDate: "2026-06-13T09:00:00",
  },
  cet6: {
    name: "CET-6",
    sections: cet6Sections,
    totalTime: 145 * 60,
    examDate: "2026年6月13日下午",
    examTimeRange: "15:00 - 17:25",
    examStartTime: { hours: 15, minutes: 0 },
    targetDate: "2026-06-13T15:00:00",
  },
  // 高考 - 6月7日
  gaokao_yuwen: {
    name: "高考 · 语文",
    sections: gaokaoYuwen,
    totalTime: 150 * 60,
    examDate: "6月7日上午",
    examTimeRange: "9:00 - 11:30",
    examStartTime: { hours: 9, minutes: 0 },
    targetDate: "2027-06-07T09:00:00",
  },
  gaokao_shuxue: {
    name: "高考 · 数学",
    sections: gaokaoShuxue,
    totalTime: 120 * 60,
    examDate: "6月7日下午",
    examTimeRange: "15:00 - 17:00",
    examStartTime: { hours: 15, minutes: 0 },
    targetDate: "2027-06-07T15:00:00",
  },
  // 高考 - 6月8日
  gaokao_wuli: {
    name: "高考 · 物理",
    sections: gaokaoWuli,
    totalTime: 75 * 60,
    examDate: "6月8日上午",
    examTimeRange: "9:00 - 10:15",
    examStartTime: { hours: 9, minutes: 0 },
    targetDate: "2027-06-08T09:00:00",
  },
  gaokao_lishi: {
    name: "高考 · 历史",
    sections: gaokaoLishi,
    totalTime: 75 * 60,
    examDate: "6月8日上午",
    examTimeRange: "9:00 - 10:15",
    examStartTime: { hours: 9, minutes: 0 },
    targetDate: "2027-06-08T09:00:00",
  },
  gaokao_waiyu: {
    name: "高考 · 外语",
    sections: gaokaoWaiyu,
    totalTime: 120 * 60,
    examDate: "6月8日下午",
    examTimeRange: "15:00 - 17:00",
    examStartTime: { hours: 15, minutes: 0 },
    targetDate: "2027-06-08T15:00:00",
  },
  // 高考 - 6月9日
  gaokao_huaxue: {
    name: "高考 · 化学",
    sections: gaokaoHuaxue,
    totalTime: 75 * 60,
    examDate: "6月9日",
    examTimeRange: "8:30 - 9:45",
    examStartTime: { hours: 8, minutes: 30 },
    targetDate: "2027-06-09T08:30:00",
  },
  gaokao_dili: {
    name: "高考 · 地理",
    sections: gaokaoDili,
    totalTime: 75 * 60,
    examDate: "6月9日",
    examTimeRange: "11:00 - 12:15",
    examStartTime: { hours: 11, minutes: 0 },
    targetDate: "2027-06-09T11:00:00",
  },
  gaokao_zhengzhi: {
    name: "高考 · 思想政治",
    sections: gaokaoZhengzhi,
    totalTime: 75 * 60,
    examDate: "6月9日",
    examTimeRange: "14:30 - 15:45",
    examStartTime: { hours: 14, minutes: 30 },
    targetDate: "2027-06-09T14:30:00",
  },
  gaokao_shengwu: {
    name: "高考 · 生物学",
    sections: gaokaoShengwu,
    totalTime: 75 * 60,
    examDate: "6月9日",
    examTimeRange: "17:00 - 18:15",
    examStartTime: { hours: 17, minutes: 0 },
    targetDate: "2027-06-09T17:00:00",
  },
};

// 加载自定义考试配置到 window.customExams
function loadCustomExams() {
  const savedExams = localStorage.getItem("customExams");
  if (savedExams) {
    try {
      window.customExams = JSON.parse(savedExams);
    } catch (e) {
      console.error("解析自定义考试数据失败，已重置为默认值", e);
      setDefaultCustomExams();
    }
  } else {
    setDefaultCustomExams();
  }
}

function setDefaultCustomExams() {
  // 如果没有保存的自定义考试，或者解析失败，设置默认预设
  window.customExams = [
    {
      id: 1,
      name: "参考预设：中期模拟考试",
      startTime: "09:00",
      date: "2026-06-20",
      timeRange: "09:00 - 11:30",
      totalMinutes: 150,
      displaySettings: {
        showCurrentTime: false,
        showCountdownTimer: true,
        showSectionTimer: true,
      },
      sections: [
        {
          name: "考前准备",
          duration: 10,
          description: "发卷及填写信息",
          countInTotal: true,
        },
        {
          name: "第一部分",
          duration: 60,
          description: "选择题模块",
          countInTotal: true,
        },
        {
          name: "第二部分",
          duration: 80,
          description: "主观题模块",
          countInTotal: true,
        },
        {
          name: "考试结束",
          duration: 0,
          description: "收起试卷",
          countInTotal: false,
        },
      ],
    },
  ];
  // 保存默认预设到 localStorage
  localStorage.setItem("customExams", JSON.stringify(window.customExams));
}

// 在脚本加载时立即加载自定义考试配置
loadCustomExams();

// 当前使用的考试类型（默认为CET-4）
let currentExamType = "cet4";
let examSections = cet4Sections;

// 总考试时间（以秒为单位）
let totalTime = 140 * 60; // CET-4总时间

let timer = null;
let timeLeft = 140 * 60;
let isRunning = false;
let currentSectionIndex = 0;
let examStartTime = new Date();
examStartTime.setHours(9, 0, 0, 0); // CET-4开始时间

let startTimeStamp = null; // 计时器最近一次启动或恢复时的系统时间戳
let elapsedBeforeLastStart = 0; // 最近一次启动或恢复前，考试已经累计消耗的秒数

// 添加变量跟踪倒计时显示状态
let isCountdownVisible = true;

// 确保所有全局变量都有初始值
if (isNaN(totalTime) || totalTime <= 0) {
  totalTime = 140 * 60; // 默认为CET-4总时间
}

if (isNaN(timeLeft) || timeLeft <= 0) {
  timeLeft = totalTime;
}

// 确保examStartTime是有效日期
if (!(examStartTime instanceof Date) || isNaN(examStartTime.getTime())) {
  examStartTime = new Date();
  const fallbackConfig = officialExams[currentExamType];
  if (fallbackConfig) {
    examStartTime.setHours(fallbackConfig.examStartTime.hours, fallbackConfig.examStartTime.minutes, 0, 0);
  } else {
    examStartTime.setHours(9, 0, 0, 0);
  }
}

// 初始化全局变量
function initializeGlobals() {
  // 设置默认为CET-4
  currentExamType = "cet4";
  examSections = cet4Sections;
  totalTime = officialExams.cet4.totalTime;
  timeLeft = totalTime;
  examStartTime = new Date();
  examStartTime.setHours(9, 0, 0, 0);

  // 更新UI元素
  document.getElementById("examType").textContent = officialExams.cet4.name;
  document.getElementById("examTitle").textContent = officialExams.cet4.name;
  document.getElementById("examDate").textContent = officialExams.cet4.examDate;
  document.getElementById("examTimeRange").textContent =
    officialExams.cet4.examTimeRange;

  // Calculate days left
  const targetDate = new Date(officialExams.cet4.targetDate);
  const now = new Date();
  const diffTime = targetDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById("examCountdown").textContent =
    `距离考试还有 ${diffDays > 0 ? diffDays : 0} 天`;
  document.getElementById("totalTime").textContent = totalTime / 60;
  document.getElementById("remainingTime").textContent = totalTime / 60;
  document.getElementById("timer").textContent = formatTime(timeLeft);
  document.getElementById("currentTimeSpan").textContent = "09:00:00";

  // 重置考试状态
  resetExam();
  updateSectionOptions();
  updateSectionList();

  // 更新切换按钮文本 - 不再需要，因为按钮已移除
  // const toggleBtn = document.getElementById('toggleExamBtn');
  // const toggleBtnSmall = document.getElementById('toggleExamBtnSmall');
  // if (toggleBtn) toggleBtn.textContent = '切换为CET-6';
  // if (toggleBtnSmall) toggleBtnSmall.textContent = '切换为CET-6';

  // 设置预设选择器的默认显示值
  if (document.getElementById("selectedPreset")) {
    document.getElementById("selectedPreset").innerHTML =
      '<span>CET-4 (大学英语四级)</span><span class="dropdown-arrow">▼</span>';
  }
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function getRealTime(currentTime) {
  // 确保examStartTime是有效的日期对象
  if (!(examStartTime instanceof Date) || isNaN(examStartTime.getTime())) {
    examStartTime = new Date();
    const fallbackConfig = officialExams[currentExamType];
    if (fallbackConfig) {
      examStartTime.setHours(fallbackConfig.examStartTime.hours, fallbackConfig.examStartTime.minutes, 0, 0);
    } else {
      examStartTime.setHours(9, 0, 0, 0);
    }
  }

  const actualTime = new Date(examStartTime.getTime() + currentTime * 1000);
  return actualTime.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function updateTimer() {
  // 基于系统时间戳计算准确的 timeLeft
  if (isRunning && startTimeStamp) {
    const elapsedSeconds = Math.floor((Date.now() - startTimeStamp) / 1000);
    timeLeft = Math.max(
      0,
      totalTime - (elapsedBeforeLastStart + elapsedSeconds),
    );
  }

  // 检查是否结束
  if (timeLeft <= 0) {
    timeLeft = 0; // 确保时间不为负数
    clearInterval(timer);
    isRunning = false;
    updateButtons();

    // 更新 UI 为结束状态
    document.getElementById("timer").textContent = formatTime(0);
    document.getElementById("remainingTime").textContent = 0;
    document.getElementById("progressFill").style.width = "100%";
    document.getElementById("currentSection").textContent = "考试结束！";
    document.getElementById("sectionTimer").style.display = "none";
    document.getElementById("currentTimeSpan").textContent =
      getRealTime(totalTime);
    document.querySelector(".countdown-value").textContent = "考试已结束";
    updateSectionList();

    // 环节切换提醒：跨入最后的「考试结束」环节时同样只提示一次
    notifySectionChange(examSections.length - 1);
    return;
  }

  document.getElementById("timer").textContent = formatTime(timeLeft);

  // 计算剩余时间
  document.getElementById("remainingTime").textContent = Math.ceil(
    timeLeft / 60,
  );

  // 更新进度条
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  document.getElementById("progressFill").style.width = `${progress}%`;

  // 更新当前环节
  const currentTime = totalTime - timeLeft;
  let currentSection = null;
  let nextSection = null;
  let nextSectionTime = 0;
  // 当前实际命中的环节下标（用于环节切换提醒去重）
  let matchedSectionIndex = -1;

  for (let i = 0; i < examSections.length; i++) {
    if (
      currentTime >= examSections[i].start * 60 &&
      currentTime < examSections[i].end * 60
    ) {
      currentSection = examSections[i];
      currentSectionIndex = i;
      matchedSectionIndex = i;

      // 找到下一环节
      if (i < examSections.length - 1) {
        nextSection = examSections[i + 1];
        nextSectionTime = examSections[i + 1].start * 60 - currentTime;
      }
      break;
    }
  }

  // 环节切换提醒：运行中倒计时自然跨入新环节时提示，同一次切换只提示一次
  if (currentSection && matchedSectionIndex >= 0) {
    notifySectionChange(matchedSectionIndex);
  }

  // 更新当前环节显示
  if (currentSection) {
    const sectionEndTime = currentSection.end * 60;
    const sectionStartTime = currentSection.start * 60;
    const timeInCurrentSection = currentTime - sectionStartTime;
    const timeLeftInSection = Math.max(0, sectionEndTime - currentTime);

    // 更新本环节倒计时显示
    document.getElementById("sectionTimer").style.display = "block";
    document.querySelector("#sectionTimer .time-value").textContent =
      formatTime(timeLeftInSection);

    document.getElementById("currentSection").innerHTML = `
                <strong>当前环节：</strong>${currentSection.name}<br>
                <small style="color: var(--color-text-muted);">${currentSection.description}</small><br>
                <small style="color: var(--color-text-light);">考场时间: ${currentSection.realTime}</small>
            `;
  } else if (timeLeft > 0) {
    // 考试还没开始
    document.getElementById("currentSection").textContent =
      "考试尚未开始，请点击开始按钮";
    document.getElementById("sectionTimer").style.display = "none";
  } else {
    // 考试已结束
    document.getElementById("currentSection").textContent = "考试结束！";
    document.getElementById("sectionTimer").style.display = "none";
  }

  // 更新倒计时
  if (nextSection) {
    document.querySelector(".countdown-value").textContent =
      `"${nextSection.name}"`;
  } else if (timeLeft > 0) {
    document.querySelector(".countdown-value").textContent = "即将结束";
  }

  // 更新环节列表
  updateSectionList();

  // 更新实时时间显示
  document.getElementById("currentTimeSpan").textContent = getRealTime(
    totalTime - timeLeft,
  );
}

function updateSectionList() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  examSections.forEach((section, index) => {
    const currentTime = totalTime - timeLeft;
    const sectionStart = section.start * 60;
    const sectionEnd = section.end * 60;

    let status = "upcoming";
    let isActive = false;
    let isCompleted = false;

    // 只有在考试进行中时才计算实际状态
    if (isRunning) {
      if (currentTime >= sectionStart && currentTime < sectionEnd) {
        status = "current";
        isActive = true;
      } else if (currentTime >= sectionEnd) {
        status = "completed";
        isCompleted = true;
      }
    }

    // 构建基础类名
    let className = "section";
    if (isActive) className += " active";
    if (isCompleted) className += " completed";

    const sectionDiv = document.createElement("div");
    sectionDiv.className = className;

    let statusText = "";
    switch (status) {
      case "current":
        statusText = '<span class="status-current">进行中</span>';
        break;
      case "completed":
        statusText = '<span class="status-completed">已完成</span>';
        break;
      case "upcoming":
        statusText = '<span class="status-upcoming">待开始</span>';
        break;
    }

    // 不计入总时间的环节为零时长占位，标题固定显示为「休息（不计时）」
    const sectionTitle =
      section.countInTotal === false
        ? "休息（不计时）"
        : `${section.name} (${section.duration}min)`;

    sectionDiv.innerHTML = `
                <div class="section-title">${sectionTitle}</div>
                <div class="section-time">${section.description}</div>
                <div class="section-real-time">考场时间: ${section.realTime}</div>
                ${statusText}
            `;

    timeline.appendChild(sectionDiv);
  });

  // 更新已完成环节统计
  const completed = examSections.filter((section) => {
    if (isRunning) {
      return totalTime - timeLeft >= section.end * 60;
    }
    return false;
  }).length;

  document.getElementById("completedSections").textContent = completed;
}

function startExam() {
  // 首次用户手势：创建 / 恢复 AudioContext，满足浏览器自动播放策略
  unlockSectionAlertAudio();

  // 如果考试已经结束，先重置再开始
  if (timeLeft <= 0) {
    resetExam();
  }

  isRunning = true;
  startTimeStamp = Date.now();
  elapsedBeforeLastStart = totalTime - timeLeft;
  timer = setInterval(updateTimer, 1000);
  // 同步提醒基线，避免「开始考试」被误判为环节切换
  syncSectionAlertBaseline();
  updateButtons();
  updateSectionList();
}

function pauseExam() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    if (startTimeStamp) {
      const elapsedSeconds = Math.floor((Date.now() - startTimeStamp) / 1000);
      elapsedBeforeLastStart += elapsedSeconds;
      timeLeft = Math.max(0, totalTime - elapsedBeforeLastStart);
    }
    updateButtons();
  }
}

function resetExam() {
  clearInterval(timer);
  isRunning = false;
  startTimeStamp = null;
  elapsedBeforeLastStart = 0;
  timeLeft = totalTime;
  currentSectionIndex = 0;
  // 同步提醒基线，避免重置 / 切换配置被误判为环节切换
  syncSectionAlertBaseline();
  document.getElementById("timer").textContent = formatTime(timeLeft);
  // 使用getRealTime函数获取正确的时间显示
  document.getElementById("currentTimeSpan").textContent = getRealTime(0);
  document.getElementById("sectionTimer").style.display = "none";
  updateButtons();
  updateSectionList();
  document.getElementById("currentSection").textContent =
    "考试尚未开始，请点击开始按钮";
  document.querySelector(".countdown-value").textContent = "--";
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("remainingTime").textContent = totalTime / 60;
}

function syncTimeOnManualChange() {
  elapsedBeforeLastStart = totalTime - timeLeft;
  if (isRunning) {
    startTimeStamp = Date.now();
  }
}

function updateButtons() {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (isRunning) {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  } else {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  // 根据考试状态更新开始按钮的文本
  if (timeLeft <= 0) {
    // 考试结束，显示"再次考试"
    startBtn.textContent = "再次考试";
  } else if (!isRunning && totalTime - timeLeft > 0) {
    // 暂停状态，显示"继续考试"
    startBtn.textContent = "继续考试";
  } else {
    // 默认状态，显示"开始考试"
    startBtn.textContent = "开始考试";
  }
}

function handleSectionChange() {
  // 下拉框切换属于用户手势，可据此创建 / 恢复 AudioContext
  unlockSectionAlertAudio();

  const selectedValue = document.getElementById("sectionSelect").value;
  const targetTime = examSections[selectedValue].start * 60;
  // 下界钳制，确保任何跳转后 timeLeft 都落在 [0, totalTime] 内
  timeLeft = Math.max(0, totalTime - targetTime);
  syncTimeOnManualChange();
  currentSectionIndex = parseInt(selectedValue);
  document.getElementById("currentTimeSpan").textContent =
    getRealTime(targetTime);
  updateSectionList();

  // 环节切换提醒：下拉框选择跳转
  notifySectionChange(getSectionIndexForTime(targetTime));
}

function skipToSelectedSection() {
  // 下拉框跳转属于用户手势，可据此创建 / 恢复 AudioContext
  unlockSectionAlertAudio();

  const selectedValue = document.getElementById("sectionSelect").value;
  const targetTime = examSections[selectedValue].start * 60;
  // 下界钳制，确保任何跳转后 timeLeft 都落在 [0, totalTime] 内
  timeLeft = Math.max(0, totalTime - targetTime);
  syncTimeOnManualChange();
  currentSectionIndex = parseInt(selectedValue);
  document.getElementById("currentTimeSpan").textContent =
    getRealTime(targetTime);
  updateSectionList();
  document.getElementById("timer").textContent = formatTime(timeLeft);

  // 更新本环节倒计时显示
  if (examSections[currentSectionIndex]) {
    const section = examSections[currentSectionIndex];
    const timeLeftInSection = (section.end - section.start) * 60;
    document.getElementById("sectionTimer").style.display = "block";
    document.querySelector("#sectionTimer .time-value").textContent =
      formatTime(timeLeftInSection);
  }

  // 环节切换提醒：下拉框选择跳转
  notifySectionChange(getSectionIndexForTime(targetTime));
}

// 函数：跳转到下一个环节
function nextSection() {
  // 点击「下一环节」属于用户手势，可据此创建 / 恢复 AudioContext
  unlockSectionAlertAudio();

  // 如果考试尚未开始，先启动考试
  if (!isRunning) {
    startExam();
    return;
  }

  // 如果考试已经结束，重置考试
  if (timeLeft <= 0) {
    resetExam();
    return;
  }

  // 获取当前时间
  const currentTime = totalTime - timeLeft;

  // 查找当前环节
  let currentSectionIndex = 0;
  for (let i = 0; i < examSections.length; i++) {
    if (
      currentTime >= examSections[i].start * 60 &&
      currentTime < examSections[i].end * 60
    ) {
      currentSectionIndex = i;
      break;
    }
  }

  // 如果已经是最后一个环节，重置考试
  if (currentSectionIndex >= examSections.length - 1) {
    resetExam();
    return;
  }

  // 如果不是最后一个环节，则跳转到下一个环节
  const nextSectionIndex = currentSectionIndex + 1;
  const targetTime = examSections[nextSectionIndex].start * 60;
  // 下界钳制，确保任何跳转后 timeLeft 都落在 [0, totalTime] 内
  timeLeft = Math.max(0, totalTime - targetTime);
  syncTimeOnManualChange();
  document.getElementById("currentTimeSpan").textContent =
    getRealTime(targetTime);
  document.getElementById("timer").textContent = formatTime(timeLeft);

  // 环节切换提醒：点击「下一环节」按钮
  notifySectionChange(getSectionIndexForTime(targetTime));

  // 更新本环节倒计时显示
  if (examSections[nextSectionIndex]) {
    const section = examSections[nextSectionIndex];
    const timeLeftInSection = (section.end - section.start) * 60;
    document.getElementById("sectionTimer").style.display = "block";
    document.querySelector("#sectionTimer .time-value").textContent =
      formatTime(timeLeftInSection);
  }

  updateSectionList();
}


function updateExamConfig(examConfig) {
  // 更新全局变量
  examSections = examConfig.sections;
  totalTime = examConfig.totalTime;
  timeLeft = totalTime;

  // 设置考试开始时间
  const hours = examConfig.examStartTime.hours;
  const minutes = examConfig.examStartTime.minutes;
  examStartTime = new Date();
  examStartTime.setHours(hours, minutes, 0, 0);

  // 重置当前环节索引
  currentSectionIndex = 0;

  // 更新UI
  document.getElementById("examType").textContent = examConfig.name;
  document.getElementById("examTitle").textContent = examConfig.name;
  document.getElementById("examDate").textContent = examConfig.examDate;
  document.getElementById("examTimeRange").textContent =
    examConfig.examTimeRange;

  // Calculate days left
  const targetDateStr =
    examConfig.targetDate ||
    (examConfig.name === "CET-6" ? "2026-06-13T15:00:00" : "2026-06-13T09:00:00");
  const targetDate = new Date(targetDateStr);
  const now = new Date();
  const diffTime = targetDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById("examCountdown").textContent =
    `距离考试还有 ${diffDays > 0 ? diffDays : 0} 天`;
  document.getElementById("totalTime").textContent = totalTime / 60;
  document.getElementById("remainingTime").textContent = totalTime / 60;
  document.getElementById("timer").textContent = formatTime(timeLeft);

  // 更新当前时间显示
  document.getElementById("currentTimeSpan").textContent =
    `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;

  // 重置考试状态
  resetExam();
  updateSectionOptions();
  updateSectionList();

  // 如果考试正在进行，需要重新启动计时器
  if (isRunning) {
    if (timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }

  // 重新加载显示设置，确保复选框状态与当前设置一致
  initializeDisplaySettings();

  console.log(`已更新为${examConfig.name}的配置`);
}

function updateSectionOptions() {
  const select = document.getElementById("sectionSelect");
  select.innerHTML = "";

  examSections.forEach((section, index) => {
    // 不计入总时间的环节为零时长占位，统一显示为「休息（不计时）」
    const label =
      section.countInTotal === false
        ? "休息（不计时）"
        : `${section.name} (${section.realTime})`;
    select.innerHTML += `<option value="${index}">${label}</option>`;
  });
}

// 关闭/显示整个标题区域功能
function toggleHeader() {
  const examHeader = document.getElementById("examTimeHeader");
  const closeHeaderBtn = document.getElementById("closeHeaderBtn");
  const restoreHintSmallScreen = document.getElementById(
    "restoreHintSmallScreen",
  );
  const restoreHintLargeScreen = document.getElementById(
    "restoreHintLargeScreen",
  );
  const toggleButtonSmallScreen = document.getElementById(
    "toggleButtonSmallScreen",
  );
  const toggleExamBtnContainer = document.querySelector(
    ".toggle-exam-button-container",
  );

  if (examHeader.style.display !== "none") {
    // 隐藏标题区域
    examHeader.style.display = "none";
    closeHeaderBtn.style.display = "none"; // 隐藏关闭按钮

    // 根据屏幕宽度显示相应的恢复提示
    if (window.innerWidth > 800) {
      restoreHintLargeScreen.style.display = "block";
    } else {
      restoreHintSmallScreen.style.display = "block";
      toggleButtonSmallScreen.style.display = "block";
    }
  } else {
    // 显示标题区域
    examHeader.style.display = "block";
    closeHeaderBtn.style.display = "flex"; // 显示关闭按钮

    // 隐藏恢复提示
    restoreHintSmallScreen.style.display = "none";
    restoreHintLargeScreen.style.display = "none";
    toggleButtonSmallScreen.style.display = "none";
  }
}

// 在DOMContentLoaded事件监听器中添加检查自定义考试配置的代码
document.addEventListener("DOMContentLoaded", function () {
  // 检查是否有从自定义考试页面传递过来的配置
  const selectedCustomExam = localStorage.getItem("selectedCustomExam");
  if (selectedCustomExam) {
    try {
      applyCustomExamConfig(JSON.parse(selectedCustomExam));
    } catch (e) {
      console.error("解析选择的自定义考试配置失败", e);
    }
    // 清除已应用的配置，避免重复应用
    localStorage.removeItem("selectedCustomExam");
  }

  // 在加载完所有配置后，初始化全局变量
  initializeGlobals();

  // 为选择框添加change事件监听器
  const sectionSelectElement = document.getElementById("sectionSelect");
  if (sectionSelectElement) {
    sectionSelectElement.addEventListener("change", handleSectionChange);
  }

  // 为关闭标题区域按钮添加点击事件监听器
  const closeHeaderBtn = document.getElementById("closeHeaderBtn");
  if (closeHeaderBtn) {
    closeHeaderBtn.addEventListener("click", toggleHeader);
  }

  // 为恢复提示添加点击事件监听器
  const restoreHintSmallScreen = document.getElementById(
    "restoreHintSmallScreen",
  );
  const restoreHintLargeScreen = document.getElementById(
    "restoreHintLargeScreen",
  );

  if (restoreHintSmallScreen) {
    restoreHintSmallScreen.addEventListener("click", toggleHeader);
  }

  if (restoreHintLargeScreen) {
    restoreHintLargeScreen.addEventListener("click", toggleHeader);
  }

  // 根据屏幕宽度设置初始显示状态
  const toggleButtonSmallScreen = document.getElementById(
    "toggleButtonSmallScreen",
  );
  const customExamButtonSmallScreen = document.getElementById(
    "customExamButtonSmallScreen",
  );
  if (window.innerWidth <= 800) {
    if (customExamButtonSmallScreen) {
      customExamButtonSmallScreen.style.display = "block";
    }
  } else {
    if (customExamButtonSmallScreen) {
      customExamButtonSmallScreen.style.display = "none";
    }
  }

  // 监听窗口大小变化
  window.addEventListener("resize", function () {
    const customExamButtonSmallScreen = document.getElementById(
      "customExamButtonSmallScreen",
    );
    const restoreHintSmallScreen = document.getElementById(
      "restoreHintSmallScreen",
    );

    if (window.innerWidth <= 800) {
      // 小屏幕显示小屏幕按钮
      if (customExamButtonSmallScreen) {
        customExamButtonSmallScreen.style.display = "block";
      }

      // 如果标题区域被隐藏，显示小屏幕恢复提示
      const examHeader = document.getElementById("examTimeHeader");
      if (
        examHeader &&
        examHeader.style.display === "none" &&
        restoreHintSmallScreen
      ) {
        restoreHintSmallScreen.style.display = "block";
      }
    } else {
      // 大屏幕隐藏小屏幕按钮
      if (customExamButtonSmallScreen) {
        customExamButtonSmallScreen.style.display = "none";
      }
      if (restoreHintSmallScreen) {
        restoreHintSmallScreen.style.display = "none";
      }
    }
  });
});

// 将自定义考试的环节定义转换为内部环节链（纯函数）。
// 仅依据传入配置计算，不读写全局变量、不访问 DOM，返回 { sections, totalMinutes }。
// - 只累计「计入总时间」的环节时长，作为所有环节的定位基准
// - 不计入总时间的环节按零时长占位处理（start === end），
//   位置等于其之前所有计入环节时长之和
// - 末尾追加「考试结束」环节（start === end === totalMinutes）
function buildCustomExamSections(customExam) {
  const sections = [];

  // 考试开始时间（小时/分钟）
  const [hours, minutes] = customExam.startTime.split(":").map(Number);

  // 累计分钟数 → 考场时间字符串（HH:MM）
  const toRealTime = (minutesFromStart) => {
    const time = new Date(2000, 0, 1, hours, minutes);
    time.setMinutes(time.getMinutes() + minutesFromStart);
    return `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // 仅累计「计入总时间」的环节时长，作为所有环节的定位基准
  let elapsedMinutes = 0;

  customExam.sections.forEach((section) => {
    // 兼容旧数据：未显式标记时默认计入总时间
    const countInTotal = section.countInTotal !== false;
    // 不计入总时间的环节按零时长占位处理（start === end），
    // 位置等于其之前所有计入环节时长之和
    const duration = countInTotal ? Number(section.duration) || 0 : 0;
    const start = elapsedMinutes;
    const end = start + duration;

    sections.push({
      name: section.name,
      start: start,
      duration: duration,
      end: end,
      description: section.description,
      realTime: `${toRealTime(start)}-${toRealTime(end)}`,
      countInTotal: countInTotal,
    });

    elapsedMinutes = end;
  });

  // 计入总时间的环节时长之和即为考试总时长
  const totalMinutes = elapsedMinutes;

  // 添加考试结束环节：start === end === totalMinutes
  if (sections.length > 0) {
    sections.push({
      name: "考试结束",
      start: totalMinutes,
      duration: 0,
      end: totalMinutes,
      description: "考试结束",
      realTime: toRealTime(totalMinutes),
    });
  }

  return { sections: sections, totalMinutes: totalMinutes };
}

// 应用自定义考试配置
function applyCustomExamConfig(customExam) {
  // 构造考试配置（环节链与总时长由纯函数换算，便于自动化测试）
  const { sections: customSections, totalMinutes } =
    buildCustomExamSections(customExam);

  // 考试开始时间（小时/分钟）
  const [hours, minutes] = customExam.startTime.split(":").map(Number);

  // 更新全局变量
  currentExamType = "custom";
  examSections = customSections;
  totalTime = totalMinutes * 60;
  timeLeft = totalTime;

  // 设置考试开始时间
  examStartTime = new Date();
  examStartTime.setHours(hours, minutes, 0, 0);

  // 更新UI（标题区、总时间统计与环节链末端保持同一 totalMinutes）
  document.getElementById("examType").textContent = customExam.name;
  document.getElementById("examTitle").textContent = customExam.name;
  document.getElementById("examDate").textContent = formatDate(customExam.date);
  document.getElementById("examTimeRange").textContent =
    `${customExam.startTime} - ${calculateEndTime(customExam.startTime, totalMinutes)}`;
  document.getElementById("totalTime").textContent = totalMinutes;
  document.getElementById("remainingTime").textContent = totalMinutes;
  document.getElementById("timer").textContent = formatTime(timeLeft);
  document.getElementById("currentTimeSpan").textContent =
    `${customExam.startTime}:00`;

  // 重置考试状态
  resetExam();
  updateSectionOptions();
  updateSectionList();

  // 更新天数倒计时
  if (customExam.date) {
    const targetDate = new Date(customExam.date);
    const now = new Date();
    if (customExam.startTime) {
      const [startH, startM] = customExam.startTime.split(":").map(Number);
      targetDate.setHours(startH, startM, 0, 0);
    }
    const diffTime = targetDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById("examCountdown").textContent =
      `距离考试还有 ${diffDays > 0 ? diffDays : 0} 天`;
  } else {
    document.getElementById("examCountdown").textContent = "距离考试还有 0 天";
  }

  // 如果有自定义的显示设置，则应用它们
  if (customExam.displaySettings) {
    applyDisplaySettings(customExam.displaySettings);
  }

  // 更新切换按钮文本 - 不再需要，因为按钮已移除
  console.log(`已应用自定义考试"${customExam.name}"的配置`);
}

// 格式化日期显示
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 判断上午还是下午
  const hour = date.getHours();
  const period = hour < 12 ? "上午" : "下午";

  return `${year}年${month}月${day}日${period}`;
}

// 计算结束时间（处理跨日期的情况）
function calculateEndTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const endTime = new Date(2000, 0, 1, hours, minutes);

  // 如果开始时间加上持续时间超过了24小时，则需要处理跨日期的情况
  endTime.setMinutes(endTime.getMinutes() + durationMinutes);

  const timeStr = `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;
  const isNextDay = endTime.getDate() > 1 || endTime.getHours() < hours;
  return isNextDay ? `${timeStr} (次日)` : timeStr;
}

// 显示设置相关功能
// 添加显示设置的全局变量
let showCurrentTime = true;
let showCountdownTimer = true;
let showSectionTimer = true;
// 环节切换提醒（提示音 + 视觉提示）开关
let showSectionAlert = true;

// 读取已持久化的单项显示设置
// 自定义考试配置未携带该字段时，用它保留用户在首页保存的偏好
function getPersistedDisplaySetting(settingName, defaultValue) {
  try {
    const savedSettings = localStorage.getItem("displaySettings");
    if (!savedSettings) return defaultValue;

    const settings = JSON.parse(savedSettings);
    if (settings && settings[settingName] !== undefined) {
      return settings[settingName];
    }
  } catch (e) {
    console.error("解析显示设置失败，使用当前值", e);
  }
  return defaultValue;
}

// 初始化显示设置
function initializeDisplaySettings() {
  // 从localStorage加载设置
  const savedSettings = localStorage.getItem("displaySettings");
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings);
      showCurrentTime =
        settings.showCurrentTime !== undefined
          ? settings.showCurrentTime
          : true;
      showCountdownTimer =
        settings.showCountdownTimer !== undefined
          ? settings.showCountdownTimer
          : true;
      showSectionTimer =
        settings.showSectionTimer !== undefined
          ? settings.showSectionTimer
          : true;
      showSectionAlert =
        settings.showSectionAlert !== undefined
          ? settings.showSectionAlert
          : true;
    } catch (e) {
      console.error("解析显示设置失败，恢复默认值", e);
      showCurrentTime = true;
      showCountdownTimer = true;
      showSectionTimer = true;
      showSectionAlert = true;
    }
  } else {
    // 默认设置
    showCurrentTime = true;
    showCountdownTimer = true;
    showSectionTimer = true;
    showSectionAlert = true;
  }

  // 更新UI和复选框状态
  updateDisplaySettings();
}

// 应用特定的显示设置
function applyDisplaySettings(displaySettings) {
  // 更新全局变量
  showCurrentTime =
    displaySettings.showCurrentTime !== undefined
      ? displaySettings.showCurrentTime
      : true;
  showCountdownTimer =
    displaySettings.showCountdownTimer !== undefined
      ? displaySettings.showCountdownTimer
      : true;
  showSectionTimer =
    displaySettings.showSectionTimer !== undefined
      ? displaySettings.showSectionTimer
      : true;
  // 环节切换提醒是全局偏好：自定义考试未携带该字段时沿用已保存的设置
  showSectionAlert =
    displaySettings.showSectionAlert !== undefined
      ? displaySettings.showSectionAlert
      : getPersistedDisplaySetting("showSectionAlert", showSectionAlert);

  // 保存设置到localStorage
  const settings = {
    showCurrentTime,
    showCountdownTimer,
    showSectionTimer,
    showSectionAlert,
  };
  localStorage.setItem("displaySettings", JSON.stringify(settings));

  // 更新UI
  updateDisplaySettings();
}

// 切换显示设置
function toggleDisplaySetting(settingName, value) {
  // 更新变量
  switch (settingName) {
    case "showCurrentTime":
      showCurrentTime = value;
      break;
    case "showCountdownTimer":
      showCountdownTimer = value;
      break;
    case "showSectionTimer":
      showSectionTimer = value;
      break;
    case "showSectionAlert":
      showSectionAlert = value;
      // 勾选开关本身就是用户手势，可借此创建 / 恢复 AudioContext
      if (showSectionAlert) {
        unlockSectionAlertAudio();
      } else {
        // 关闭提醒时清理可能仍在显示的视觉提示
        clearSectionChangeVisuals();
      }
      break;
  }

  // 保存设置到localStorage
  const settings = {
    showCurrentTime,
    showCountdownTimer,
    showSectionTimer,
    showSectionAlert,
  };
  localStorage.setItem("displaySettings", JSON.stringify(settings));

  // 更新UI
  updateDisplaySettings();
}

// 重置显示设置为默认值
function resetDisplaySettings() {
  // 检查当前是否选择了自定义考试，并且它有自定义显示设置
  const selectedCustomExam = localStorage.getItem("selectedCustomExam");
  if (selectedCustomExam) {
    try {
      const exam = JSON.parse(selectedCustomExam);
      if (exam.displaySettings) {
        applyDisplaySettings(exam.displaySettings);
        return;
      }
    } catch (e) {
      console.error("解析选中自定义考试的显示设置失败", e);
    }
  }

  // 如果当前是官方预设或自定义考试没有显示设置，则恢复为全部显示
  applyDisplaySettings({
    showCurrentTime: true,
    showCountdownTimer: true,
    showSectionTimer: true,
    showSectionAlert: true,
  });
}

// 更新显示设置的UI
function updateDisplaySettings() {
  // 更新复选框状态
  const currentTimeCheckbox = document.getElementById("inlineShowCurrentTime");
  const countdownTimerCheckbox = document.getElementById(
    "inlineShowCountdownTimer",
  );
  const sectionTimerCheckbox = document.getElementById(
    "inlineShowSectionTimer",
  );
  const sectionAlertCheckbox = document.getElementById(
    "inlineShowSectionAlert",
  );

  if (currentTimeCheckbox) currentTimeCheckbox.checked = showCurrentTime;
  if (countdownTimerCheckbox)
    countdownTimerCheckbox.checked = showCountdownTimer;
  if (sectionTimerCheckbox) sectionTimerCheckbox.checked = showSectionTimer;
  if (sectionAlertCheckbox) sectionAlertCheckbox.checked = showSectionAlert;

  // 控制元素显示/隐藏
  const currentTimeSpan = document.getElementById("currentTimeSpan");
  const timerDisplay = document.querySelector(".timer-display");
  const sectionTimerDisplay = document.getElementById("sectionTimer");

  if (currentTimeSpan) {
    const realTimeDisplay = document.querySelector(".real-time-display");
    if (realTimeDisplay) {
      realTimeDisplay.style.display = showCurrentTime ? "block" : "none";
    }
  }

  if (timerDisplay) {
    timerDisplay.style.display = showCountdownTimer ? "block" : "none";
  }

  if (sectionTimerDisplay) {
    // 根据用户设置和当前考试状态决定显示
    if (showSectionTimer) {
      // 如果用户希望显示，我们只改变它的CSS display属性而不影响其原本的显示状态
      sectionTimerDisplay.style.display = ""; // 重置为默认值
    } else {
      // 如果用户不希望显示，则强制隐藏
      sectionTimerDisplay.style.display = "none";
    }
  }

  // 特别处理本环节倒计时的内部元素
  if (sectionTimerDisplay && !showSectionTimer) {
    // 如果用户不希望显示本环节倒计时，则隐藏内部元素
    const timeValue = sectionTimerDisplay.querySelector(".time-value");
    if (timeValue) {
      timeValue.style.display = "none";
    }
  } else if (sectionTimerDisplay && showSectionTimer) {
    const timeValue = sectionTimerDisplay.querySelector(".time-value");
    if (timeValue) {
      timeValue.style.display = "";
    }
  }
}

// ==================== 环节切换提醒（提示音 + 视觉提示）====================
// 提示音使用 Web Audio API 实时合成（OscillatorNode + GainNode 包络），
// 不依赖任何外部音频文件或 CDN，因此离线也能正常发声。

// 提示音由两个短音符组成，总时长约 260ms
const SECTION_ALERT_NOTES = [
  { frequency: 880, offset: 0, duration: 0.12 },
  { frequency: 1318.51, offset: 0.12, duration: 0.14 },
];
// 当前环节闪烁高亮时长
const SECTION_ALERT_FLASH_DURATION = 1600;
// 浮层提示显示时长
const SECTION_ALERT_TOAST_DURATION = 2000;

// AudioContext 仅在用户手势中创建 / 恢复，以符合浏览器自动播放策略
let sectionAlertAudioContext = null;
// 上一次已提示过的环节下标，保证同一次切换只提示一次
let lastNotifiedSectionIndex = -1;
// 视觉提示相关定时器与节点引用
let sectionFlashTimer = null;
let sectionToastTimer = null;
let sectionToastElement = null;

// 获取 AudioContext 构造函数（兼容 webkit 前缀，不支持的浏览器返回 null）
function getAudioContextConstructor() {
  if (typeof window === "undefined") return null;
  return window.AudioContext || window.webkitAudioContext || null;
}

// 在用户手势回调中调用：创建 / 恢复 AudioContext，失败时静默降级
function unlockSectionAlertAudio() {
  const AudioContextConstructor = getAudioContextConstructor();
  if (!AudioContextConstructor) return;

  try {
    if (!sectionAlertAudioContext) {
      sectionAlertAudioContext = new AudioContextConstructor();
    }

    if (
      sectionAlertAudioContext.state === "suspended" &&
      typeof sectionAlertAudioContext.resume === "function"
    ) {
      const resumeResult = sectionAlertAudioContext.resume();
      // resume() 返回 Promise，捕获异常避免未处理的拒绝
      if (resumeResult && typeof resumeResult.catch === "function") {
        resumeResult.catch(function () {});
      }
    }
  } catch (error) {
    // 浏览器不支持或用户禁用音频时保持静默，不影响考试计时
    sectionAlertAudioContext = null;
  }
}

// 合成并播放一段短提示音
function playSectionChangeSound() {
  const audioContext = sectionAlertAudioContext;
  // 未获得用户手势授权时（context 不存在或仍为 suspended）不尝试播放
  if (!audioContext || audioContext.state !== "running") return;

  try {
    const startTime = audioContext.currentTime;
    const lastNote = SECTION_ALERT_NOTES[SECTION_ALERT_NOTES.length - 1];

    // 总音量包络：快速起音后平滑衰减，避免结尾出现爆音
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.0001, startTime);
    masterGain.gain.exponentialRampToValueAtTime(0.5, startTime + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + lastNote.offset + lastNote.duration,
    );
    masterGain.connect(audioContext.destination);

    SECTION_ALERT_NOTES.forEach(function (note) {
      const noteStart = startTime + note.offset;
      const noteEnd = noteStart + note.duration;

      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(note.frequency, noteStart);

      // 每个音符单独做一次包络，形成清脆的"叮咚"两声
      const noteGain = audioContext.createGain();
      noteGain.gain.setValueAtTime(0.0001, noteStart);
      noteGain.gain.exponentialRampToValueAtTime(0.9, noteStart + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

      oscillator.connect(noteGain);
      noteGain.connect(masterGain);
      oscillator.start(noteStart);
      oscillator.stop(noteEnd + 0.02);
    });
  } catch (error) {
    // 合成失败时不影响考试主流程
  }
}

// 视觉提示一：当前环节区域闪烁高亮约 1.6 秒
function flashCurrentSection() {
  if (typeof document === "undefined") return;

  const currentSectionElement = document.getElementById("currentSection");
  if (!currentSectionElement || !currentSectionElement.classList) return;

  currentSectionElement.classList.remove("section-change-flash");
  // 读取布局属性强制重排，保证连续切换时 CSS 动画可以重新播放
  void currentSectionElement.offsetWidth;
  currentSectionElement.classList.add("section-change-flash");

  if (sectionFlashTimer) clearTimeout(sectionFlashTimer);
  sectionFlashTimer = setTimeout(function () {
    currentSectionElement.classList.remove("section-change-flash");
    sectionFlashTimer = null;
  }, SECTION_ALERT_FLASH_DURATION);
}

// 视觉提示二：2 秒后自动消失的浮层提示（不打断考试，不接收点击）
function showSectionChangeToast(section) {
  if (typeof document === "undefined" || !document.body) return;

  const sectionName = section && section.name ? section.name : "新环节";

  // 上一枚提示尚未消失时先移除，避免叠加
  if (sectionToastElement && typeof sectionToastElement.remove === "function") {
    sectionToastElement.remove();
  }

  const toast = document.createElement("div");
  toast.className = "section-change-toast";
  toast.setAttribute("role", "status");
  toast.textContent = `环节切换：${sectionName}`;
  document.body.appendChild(toast);
  sectionToastElement = toast;

  if (sectionToastTimer) clearTimeout(sectionToastTimer);
  sectionToastTimer = setTimeout(function () {
    if (typeof toast.remove === "function") toast.remove();
    if (sectionToastElement === toast) sectionToastElement = null;
    sectionToastTimer = null;
  }, SECTION_ALERT_TOAST_DURATION);
}

// 清理可能仍在显示的视觉提示（关闭开关时调用）
function clearSectionChangeVisuals() {
  if (sectionFlashTimer) {
    clearTimeout(sectionFlashTimer);
    sectionFlashTimer = null;
  }

  if (typeof document !== "undefined") {
    const currentSectionElement = document.getElementById("currentSection");
    if (currentSectionElement && currentSectionElement.classList) {
      currentSectionElement.classList.remove("section-change-flash");
    }
  }

  if (sectionToastTimer) {
    clearTimeout(sectionToastTimer);
    sectionToastTimer = null;
  }

  if (sectionToastElement && typeof sectionToastElement.remove === "function") {
    sectionToastElement.remove();
  }
  sectionToastElement = null;
}

// 按已消耗时间查找实际生效的环节下标（与 updateTimer 的判定逻辑保持一致）
function getSectionIndexForTime(elapsedSeconds) {
  for (let i = 0; i < examSections.length; i++) {
    if (
      elapsedSeconds >= examSections[i].start * 60 &&
      elapsedSeconds < examSections[i].end * 60
    ) {
      return i;
    }
  }

  // 落在所有环节区间之外（零时长占位环节、考试结束时刻等），
  // 退化为最后一个已开始的环节
  let fallbackIndex = -1;
  for (let i = 0; i < examSections.length; i++) {
    if (examSections[i].start * 60 <= elapsedSeconds) {
      fallbackIndex = i;
    }
  }
  return fallbackIndex;
}

// 同步提醒基线：把当前环节标记为"已提示"
// 用于开始考试 / 重置考试 / 切换考试配置后，避免把首次渲染误判为环节切换
function syncSectionAlertBaseline() {
  lastNotifiedSectionIndex = getSectionIndexForTime(totalTime - timeLeft);
}

// 环节切换提醒统一入口：
// - 以环节下标去重，确保同一次切换（自然跨入与手动跳转叠加）只提示一次
// - 开关关闭时不发声，也不显示视觉提示
// - 考试结束时刻同样会提示最后一次
function notifySectionChange(sectionIndex) {
  const section = examSections[sectionIndex];
  if (!section) return;
  if (sectionIndex === lastNotifiedSectionIndex) return;

  lastNotifiedSectionIndex = sectionIndex;

  if (!showSectionAlert) return;

  playSectionChangeSound();
  flashCurrentSection();
  showSectionChangeToast(section);
}

// 在DOM加载完成后初始化显示设置
document.addEventListener("DOMContentLoaded", function () {
  initializeDisplaySettings();
});
