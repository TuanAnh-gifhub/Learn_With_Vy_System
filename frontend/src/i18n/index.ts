import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "../components/Language/translations";

const resources: Resource = {
  vi: { translation: translations.vi },
  en: { translation: translations.en },
  ko: { translation: translations.ko },
  zh: { translation: translations.zh },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

