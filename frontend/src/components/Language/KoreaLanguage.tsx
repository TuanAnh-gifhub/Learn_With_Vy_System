import React from "react";

interface KoreaLanguageProps {
  active: boolean;
  onSelect: () => void;
}

const KoreaLanguage: React.FC<KoreaLanguageProps> = ({
  active,
  onSelect,
}) => {
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
      <span className="text-lg">🇰🇷</span>
      <span>한국어</span>
    </button>
  );
};

export default KoreaLanguage;
