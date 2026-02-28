import { type SupportedLanguage } from "./LanguageContext";

type TranslationTree = {
  [key: string]: string | TranslationTree;
};

const translations: Record<SupportedLanguage, TranslationTree> = {
  vi: {
    menu: {
      home: "Trang chủ",
      categories: "Danh mục",
      oneOnOne: "Lớp học 1:1",
      group: "Lớp nhóm",
      ielts: "IELTS",
      toeic: "TOEIC",
      kids: "Thiếu nhi",
      business: "Business English",
      about: "Về chúng tôi",
      contact: "Liên hệ",
      policy: "Chính sách",
    },
  },
  en: {
    menu: {
      home: "Home",
      categories: "Categories",
      oneOnOne: "1-on-1 Classes",
      group: "Group Classes",
      ielts: "IELTS",
      toeic: "TOEIC",
      kids: "Kids",
      business: "Business English",
      about: "About us",
      contact: "Contact",
      policy: "Policy",
    },
  },
  ko: {
    menu: {
      home: "홈",
      categories: "카테고리",
      oneOnOne: "1:1 수업",
      group: "그룹 수업",
      ielts: "IELTS",
      toeic: "TOEIC",
      kids: "어린이",
      business: "비즈니스 영어",
      about: "회사 소개",
      contact: "문의하기",
      policy: "정책",
    },
  },
  zh: {
    menu: {
      home: "首页",
      categories: "分类",
      oneOnOne: "一对一课程",
      group: "小组课程",
      ielts: "雅思",
      toeic: "托业",
      kids: "少儿英语",
      business: "商务英语",
      about: "关于我们",
      contact: "联系",
      policy: "政策",
    },
  },
};

const getFromTree = (tree: TranslationTree, path: string[]): string | null => {
  let current: string | TranslationTree | undefined = tree;
  for (const segment of path) {
    if (!current || typeof current === "string") return null;
    current = current[segment];
  }
  return typeof current === "string" ? current : null;
};

export const translate = (lang: SupportedLanguage, key: string): string => {
  const segments = key.split(".");
  const fromLang = getFromTree(translations[lang], segments);
  if (fromLang) return fromLang;

  // fallback: try Vietnamese, then key itself
  const fallback = getFromTree(translations.vi, segments);
  return fallback ?? key;
};

