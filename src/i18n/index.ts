import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { readLanguage } from "./language";

const resources = {
  en: { translation: {
    title: "Monster Field", subtitle: "Survive the glade. Grow stronger.", status: "Explorer",
    level: "Level", health: "Health", experience: "Experience", gold: "Gold", defeated: "Defeated",
    attack: "Strike", save: "Save", reset: "New run", saved: "Progress saved",
    objective: "Field notes", objectiveText: "Move with arrow keys or WASD. Strike nearby monsters with Space.",
    attackHint: "Space", moveHint: "WASD", controls: "Controls", language: "Language",
    down: "You fell in battle. Starting again from the camp.", resetConfirm: "Start a new run?",
  } },
  "zh-CN": { translation: {
    title: "怪物原野", subtitle: "在林地中生存，不断变强。", status: "探索者",
    level: "等级", health: "生命", experience: "经验", gold: "金币", defeated: "击败",
    attack: "攻击", save: "存档", reset: "新冒险", saved: "进度已保存",
    objective: "原野笔记", objectiveText: "使用方向键或 WASD 移动，按空格攻击附近怪物。",
    attackHint: "空格", moveHint: "WASD", controls: "操作", language: "语言",
    down: "你在战斗中倒下，已从营地重新出发。", resetConfirm: "确定开始新的冒险吗？",
  } },
};
void i18n.use(initReactI18next).init({ resources, lng: readLanguage(), fallbackLng: "en", interpolation: { escapeValue: false } });
export default i18n;
