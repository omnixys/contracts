export function getPrimaryPhoneNumber(phoneNumbers) {
    if (!phoneNumbers || phoneNumbers.length === 0) {
        return;
    }
    const primary = phoneNumbers.find((p) => p.isPrimary === true);
    const selected = primary ?? phoneNumbers[0];
    if (!selected.countryCode || !selected.number) {
        return;
    }
    return `${selected.countryCode}${selected.number}`;
}
