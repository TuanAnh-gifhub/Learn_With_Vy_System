/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import i18n from "../../i18n";

export type SupportedLanguage = "vi" | "en" | "ko" | "zh";

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = "app_language";

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Khởi tạo từ i18next language để đảm bảo đồng bộ
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const i18nLang = i18n.language as SupportedLanguage;
    if (i18nLang === "vi" || i18nLang === "en" || i18nLang === "ko" || i18nLang === "zh") {
      return i18nLang;
    }
    return "vi";
  });

  // Đồng bộ state với i18next khi i18next language thay đổi (từ bên ngoài)
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const newLang = lng as SupportedLanguage;
      if (newLang === "vi" || newLang === "en" || newLang === "ko" || newLang === "zh") {
        setLanguageState(newLang);
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
        } catch {
          // ignore write errors
        }
      }
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  // Đồng bộ i18next với state khi state thay đổi (từ UI)
  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore write errors
    }
    void i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};

