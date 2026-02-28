import "i18next";
import { translations } from "../components/Language/translations";

// Tạo type từ translations.vi để có type safety
type TranslationKeys = typeof translations.vi;

// Extend i18next module để có type safety cho translation keys
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: TranslationKeys;
    };
  }
}
