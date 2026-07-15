import { Locale } from "../types/locale.type.js";
export type Language = 'ENGLISH' | 'SPANISH' | 'FRENCH' | 'GERMAN' | 'CHINESE' | 'JAPANESE' | 'OTHER';
export declare const LANGUAGE_TO_LOCALE: Partial<Record<Language, Locale>>;
export declare function mapLanguageToLocale(language?: Language | null): Locale;
//# sourceMappingURL=locale.util.d.ts.map