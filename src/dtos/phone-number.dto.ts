import { PhoneNumberType } from "../enums/phone-number-type.enum.js";
export interface PhoneNumberDTO {
  type: PhoneNumberType;
  countryCode: string;
  number: string;
  label?: string;
  isPrimary?: boolean;
}
/**
 * Input type for adding a phone number to a user.
 */
export interface AddPhoneNumberDTO {
  userId: string;
  number: string;
  type: PhoneNumberType;
}
/**
 * Input type for removing a phone number from a user.
 */
export interface RemovePhoneNumberDTO {
  userId: string;
  phoneNumberId: string;
}
