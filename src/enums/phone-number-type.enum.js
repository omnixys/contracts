/**
 * Enum for different phone number categories.
 * Mirrors the Prisma enum `PhoneType`.
 */
export var PhoneNumberType;
(function (PhoneNumberType) {
    PhoneNumberType["WHATSAPP"] = "WHATSAPP";
    PhoneNumberType["MOBILE"] = "MOBILE";
    PhoneNumberType["PRIVATE"] = "PRIVATE";
    PhoneNumberType["WORK"] = "WORK";
    PhoneNumberType["HOME"] = "HOME";
    PhoneNumberType["OTHER"] = "OTHER";
})(PhoneNumberType || (PhoneNumberType = {}));
