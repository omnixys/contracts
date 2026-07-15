export const LANGUAGE_TO_LOCALE = {
    ENGLISH: 'en-US',
    GERMAN: 'de-DE',
};
export function mapLanguageToLocale(language) {
    return language ? (LANGUAGE_TO_LOCALE[language] ?? 'en-US') : 'en-US';
}
