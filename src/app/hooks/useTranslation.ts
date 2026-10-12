import { useLanguage } from '../contexts/LanguageContext';
import { albanianTranslations, bosnianTranslations, germanTranslations, polishTranslations, translations, TranslationKey } from '../i18n/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    if (language === 'pl') return polishTranslations[key] || translations.en[key] || key;
    if (language === 'de') return germanTranslations[key] || translations.en[key] || key;
    if (language === 'bs') return bosnianTranslations[key] || translations.en[key] || key;
    if (language === 'sq') return albanianTranslations[key] || translations.en[key] || key;
    return translations[language][key] || translations.en[key] || key;
  };

  return { t, language };
}
