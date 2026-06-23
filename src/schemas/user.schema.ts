import { z } from "zod";
import {
  actorIdSchema,
  eventIdSchema,
  phoneNumberSchema,
  tenantIdSchema,
} from "./identity.schema.js";

const localeSchema = z.enum(["de-DE", "en-US"]);
const dateSchema = z.union([
  z.date(),
  z.iso.datetime().transform((value) => new Date(value)),
]);

export const createPendingUserSchema = z.object({
  actorId: actorIdSchema,
  email: z.email().optional(),
  eventId: eventIdSchema,
  invitationId: z.string().uuid(),
  seatId: z.string().uuid().optional(),
  note: z.string().max(2_000).optional(),
  tenantId: tenantIdSchema.optional(),
  firstName: z.string().trim().min(1).max(128),
  lastName: z.string().trim().min(1).max(128),
  phoneNumbers: z.array(phoneNumberSchema).optional(),
  locale: localeSchema,
  plusOnes: z
    .array(
      z.object({
        firstName: z.string().trim().min(1).max(128),
        lastName: z.string().trim().min(1).max(128),
        email: z.email().optional(),
        invitationId: z.string().uuid(),
        phoneNumbers: z.array(phoneNumberSchema).optional(),
      }),
    )
    .optional(),
  eventEndsAt: dateSchema,
});

export const guestNotificationSchema = z.object({
  token: z.string().min(1),
  eventName: z.string().trim().min(1),
  seat: z.string().optional(),
  seatId: z.string().uuid().optional(),
  eventEndsAt: dateSchema,
});

export const guestAuthKeySchema = z.object({
  actorId: actorIdSchema,
  invitees: z.array(
    z.object({
      invitationId: z.string().uuid(),
      email: z.email().optional(),
      firstName: z.string().trim().min(1).max(128),
      lastName: z.string().trim().min(1).max(128),
    }),
  ),
  eventEndsAt: dateSchema,
});

export const guestSignUpTokenPayloadSchema = z.object({
  authKey: z.string().min(1),
  userKey: z.string().min(1),
  eventKey: z.string().min(1),
  seatKey: z.string().min(1),
  timestamp: z.number().int().nonnegative().optional(),
  eventEndAt: dateSchema.optional(),
});
