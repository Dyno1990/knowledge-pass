import { useLanguage } from '../contexts/LanguageContext';
import { germanTranslations, polishTranslations, translations, TranslationKey } from '../i18n/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    if (language === 'pl') return polishTranslations[key] || translations.en[key] || key;
    if (language === 'de') return germanTranslations[key] || translations.en[key] || key;
    return translations[language][key] || translations.en[key] || key;
  };

  return { t, language };
}
