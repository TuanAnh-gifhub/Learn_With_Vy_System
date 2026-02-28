import React from "react";
import { useI18n } from "./useI18n";

interface LanguageButtonProps {
  code: "vi" | "en" | "ko" | "zh";
  active: boolean;
  onSelect: () => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  code,
  active,
  onSelect,
}) => {
  const t = useI18n();
  
  const languageConfig = {
    vi: { emoji: "🇻🇳", key: "language.nameVi" },
    en: { emoji: "🇺🇸", key: "language.nameEn" },
    ko: { emoji: "🇰🇷", key: "language.nameKo" },
    zh: { emoji: "🇨🇳", key: "language.nameZh" },
  };

  const config = languageConfig[code];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
        active
          ? "border-[#5cdb95] bg-white text-[#034732]"
          : "border-gray-200 bg-white/80 text-gray-700 hover:border-[#5cdb95]/70"
      }`}
    >
      <span className="text-lg">{config.emoji}</span>
      <span>{t(config.key)}</span>
    </button>
  );
};

export default LanguageButton;
