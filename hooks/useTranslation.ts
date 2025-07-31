import { useRouter } from "next/router";
import { Locale, translations, DEFAULT_LANGUAGE_CODE } from "constants/translations";

export type TranslationKey = keyof typeof translations;

export const useTranslation = () => {
  const { query } = useRouter();
  const locale = (query.lang as Locale) || DEFAULT_LANGUAGE_CODE;

  const t = (key: TranslationKey): string => {
    return (
      translations?.[key]?.[locale] ||
      translations?.[key]?.[DEFAULT_LANGUAGE_CODE] ||
      "[missing translation]"
    );
  };

  return { t };
};
