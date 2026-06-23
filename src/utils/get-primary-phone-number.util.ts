import type { PhoneNumberDTO } from '@omnixys/shared';

export function getPrimaryPhoneNumber(
  phoneNumbers?: PhoneNumberDTO[],
): string | undefined {
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
