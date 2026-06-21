import type { Locale } from '@omnixys/contracts';

export type Language =
  | 'ENGLISH'
  | 'SPANISH'
  | 'FRENCH'
  | 'GERMAN'
  | 'CHINESE'
  | 'JAPANESE'
  | 'OTHER';

export const LANGUAGE_TO_LOCALE: Partial<Record<Language, Locale>> = {
  ENGLISH: 'en-US',
  GERMAN: 'de-DE',
};

export function mapLanguageToLocale(language?: Language | null): Locale {
  return language ? (LANGUAGE_TO_LOCALE[language] ?? 'en-US') : 'en-US';
}
