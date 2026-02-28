import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "../components/Language/translations";
// TypeScript sẽ tự động nhận diện types.d.ts trong cùng thư mục

const resources: Resource = {
  vi: { translation: translations.vi },
  en: { translation: translations.en },
  ko: { translation: translations.ko },
  zh: { translation: translations.zh },
};

// Lấy language từ localStorage hoặc browser, fallback về "vi"
const getInitialLanguage = (): string => {
  try {
    const saved = localStorage.getItem("app_language");
    if (saved === "vi" || saved === "en" || saved === "ko" || saved === "zh") {
      return saved;
    }
  } catch {
    // ignore localStorage errors
  }
  return "vi";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "vi",
  supportedLngs: ["vi", "en", "ko", "zh"],
  interpolation: {
    escapeValue: false, // React đã tự escape, không cần i18next escape
  },
  react: {
    useSuspense: false, // Không dùng Suspense để tránh lỗi khi chưa load xong
  },
  // Debug mode chỉ bật trong development
  debug: import.meta.env.DEV,
  // Load missing translations từ fallback language thay vì hiển thị key
  load: "languageOnly",
  // Không cache namespace
  ns: ["translation"],
  defaultNS: "translation",
});

export default i18n;

