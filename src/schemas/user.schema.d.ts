import { z } from "zod";
export declare const createPendingUserSchema: z.ZodObject<{
    actorId: z.ZodString;
    email: z.ZodOptional<z.ZodEmail>;
    eventId: z.ZodString;
    invitationId: z.ZodString;
    seatId: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    tenantId: z.ZodOptional<z.ZodString>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phoneNumbers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<typeof import("../index.js").PhoneNumberType>;
        countryCode: z.ZodString;
        number: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
        isPrimary: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>>;
    locale: z.ZodEnum<{
        "de-DE": "de-DE";
        "en-US": "en-US";
    }>;
    plusOnes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodOptional<z.ZodEmail>;
        invitationId: z.ZodString;
        phoneNumbers: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<typeof import("../index.js").PhoneNumberType>;
            countryCode: z.ZodString;
            number: z.ZodString;
            label: z.ZodOptional<z.ZodString>;
            isPrimary: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    eventEndsAt: z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodISODateTime, z.ZodTransform<Date, string>>]>;
}, z.core.$strip>;
export declare const guestNotificationSchema: z.ZodObject<{
    token: z.ZodString;
    eventName: z.ZodString;
    seat: z.ZodOptional<z.ZodString>;
    seatId: z.ZodOptional<z.ZodString>;
    eventEndsAt: z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodISODateTime, z.ZodTransform<Date, string>>]>;
}, z.core.$strip>;
export declare const guestAuthKeySchema: z.ZodObject<{
    actorId: z.ZodString;
    invitees: z.ZodArray<z.ZodObject<{
        invitationId: z.ZodString;
        email: z.ZodOptional<z.ZodEmail>;
        firstName: z.ZodString;
        lastName: z.ZodString;
    }, z.core.$strip>>;
    eventEndsAt: z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodISODateTime, z.ZodTransform<Date, string>>]>;
}, z.core.$strip>;
export declare const guestSignUpTokenPayloadSchema: z.ZodObject<{
    authKey: z.ZodString;
    userKey: z.ZodString;
    eventKey: z.ZodString;
    seatKey: z.ZodString;
    timestamp: z.ZodOptional<z.ZodNumber>;
    eventEndAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodISODateTime, z.ZodTransform<Date, string>>]>>;
}, z.core.$strip>;
//# sourceMappingURL=user.schema.d.ts.map