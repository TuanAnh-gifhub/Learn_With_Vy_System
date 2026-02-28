import { useLanguage } from "./LanguageContext";
import { translate } from "./translations";

/**
 * Hook i18n custom sử dụng LanguageContext + bảng translations tĩnh.
 * Không phụ thuộc react-i18next để tránh lỗi useContext nội bộ.
 */
export const useI18n = () => {
  const { language } = useLanguage();
  return (key: string): string => translate(language, key);
};

