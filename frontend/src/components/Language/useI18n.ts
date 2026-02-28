import { useLanguage } from "./LanguageContext";
import { translate } from "./translations";

export const useI18n = () => {
  const { language } = useLanguage();
  return (key: string): string => translate(language, key);
};

