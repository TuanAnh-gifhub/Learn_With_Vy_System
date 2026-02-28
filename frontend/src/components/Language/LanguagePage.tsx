import React from "react";
import { useLanguage } from "./LanguageContext";
import VietnamLanguage from "./VietnamLanguage";
import EnglishLanguage from "./EnglishLanguage";
import KoreaLanguage from "./KoreaLanguage";
import ChinaLanguage from "./ChinaLanguage";
import { useI18n } from "./useI18n";

const LanguagePage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = useI18n();

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <h2 className="text-lg sm:text-xl font-bold text-[#034732] text-center mb-1">
        {t("language.title")}
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4">
        {t("language.description")}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <VietnamLanguage
          active={language === "vi"}
          onSelect={() => setLanguage("vi")}
        />
        <EnglishLanguage
          active={language === "en"}
          onSelect={() => setLanguage("en")}
        />
        <KoreaLanguage
          active={language === "ko"}
          onSelect={() => setLanguage("ko")}
        />
        <ChinaLanguage
          active={language === "zh"}
          onSelect={() => setLanguage("zh")}
        />
      </div>

      <div className="mt-4 text-center text-xs sm:text-sm text-gray-500">
        {t("language.currentLanguage")}:{" "}
        <span className="font-semibold text-[#379683] uppercase">
          {language}
        </span>
      </div>
    </div>
  );
};

export default LanguagePage;
