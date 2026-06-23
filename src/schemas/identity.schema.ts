import { z } from "zod";
import { PhoneNumberType } from "../enums/phone-number-type.enum.js";

export const requestIdSchema = z.string().trim().min(1).max(128);
export const correlationIdSchema = requestIdSchema;
export const actorIdSchema = z.string().uuid();
export const tenantIdSchema = z.string().trim().min(1).max(128);
export const userIdSchema = z.string().uuid();
export const eventIdSchema = z.string().uuid();

export const phoneNumberSchema = z.object({
  type: z.enum(PhoneNumberType),
  countryCode: z.string().trim().min(1).max(8),
  number: z.string().trim().min(6).max(32),
  label: z.string().trim().min(1).max(64).optional(),
  isPrimary: z.boolean().optional(),
});
