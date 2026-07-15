import { z } from "zod";
import { PhoneNumberType } from "../enums/phone-number-type.enum.js";
export declare const requestIdSchema: z.ZodString;
export declare const correlationIdSchema: z.ZodString;
export declare const actorIdSchema: z.ZodString;
export declare const tenantIdSchema: z.ZodString;
export declare const userIdSchema: z.ZodString;
export declare const eventIdSchema: z.ZodString;
export declare const phoneNumberSchema: z.ZodObject<{
    type: z.ZodEnum<typeof PhoneNumberType>;
    countryCode: z.ZodString;
    number: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    isPrimary: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=identity.schema.d.ts.map