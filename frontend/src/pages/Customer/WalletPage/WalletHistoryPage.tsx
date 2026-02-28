import { useState, useEffect } from "react";
import WalletHistory from "./WalletHistory";
import { useI18n } from "../../../components/Language/useI18n";

const WalletHistoryPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('landing_dark_mode');
    return stored === 'true';
  });
  const t = useI18n();

  useEffect(() => {
    const handleDarkModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ isDarkMode: boolean }>;
      setIsDarkMode(customEvent.detail.isDarkMode);
    };

    window.addEventListener('darkModeChanged', handleDarkModeChange);
    return () => window.removeEventListener('darkModeChanged', handleDarkModeChange);
  }, []);

  return (
    <div className="relative min-h-screen w-full py-8" style={{ background: isDarkMode ? '#1a1a2e' : '#f5f7fa' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t("wallet.historyPageTitle")}
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            {t("wallet.historyPageSubtitle")}
          </p>
        </div>
        <WalletHistory showFull={true} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default WalletHistoryPage;
