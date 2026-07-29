import { z } from "zod";

export const AnalyticsProducerSchema = z.enum([
  "checkpoint",
  "address",
  "authentication",
  "chat",
  "communication-gateway",
  "event",
  "invitation",
  "notification",
  "seat",
  "ticket",
  "user",
]);

export const AnalyticsDomainEventNameSchema = z.enum([
  "AddressCreated",
  "AddressUpdated",
  "AddressDeleted",
  "LoginSucceeded",
  "LoginFailed",
  "LogoutSucceeded",
  "EmailVerified",
  "PhoneVerified",
  "ConversationCreated",
  "MessageSent",
  "ConversationClosed",
  "MessageDeliverySucceeded",
  "MessageDeliveryFailed",
  "EventCreated",
  "EventUpdated",
  "EventActivated",
  "EventDeactivated",
  "EventDeleted",
  "InvitationCreated",
  "InvitationAccepted",
  "InvitationDeclined",
  "InvitationExpired",
  "RsvpSubmitted",
  "RsvpUpdated",
  "NotificationDelivered",
  "NotificationFailed",
  "SeatAssigned",
  "SeatChanged",
  "SeatUnassigned",
  "TicketGenerated",
  "TicketRevoked",
  "QrScanSucceeded",
  "QrScanRejected",
  "GuestCheckedIn",
  "GuestCheckedOut",
  "ProfileUpdated",
]);

const blockedPropertyNames = new Set([
  "access_token",
  "authorization",
  "body",
  "cookie",
  "email",
  "invitation",
  "invitationtoken",
  "message",
  "password",
  "phone",
  "qrcode",
  "refresh_token",
  "secret",
  "signature",
  "ticket",
  "token",
]);

const AnalyticsFactPropertiesSchema = z
  .record(z.string().min(1).max(100), z.unknown())
  .superRefine((value, context) => {
    inspectSensitiveKeys(value, [], context);
  });

export const AnalyticsDomainFactSchema = z
  .object({
    producer: AnalyticsProducerSchema,
    eventName: AnalyticsDomainEventNameSchema,
    occurredAt: z.string().datetime({ offset: true }),
    subjectId: z.string().min(1).max(256).optional(),
    aggregateId: z.string().min(1).max(256),
    aggregateType: z.string().min(1).max(100),
    properties: AnalyticsFactPropertiesSchema.default({}),
  })
  .strict();

export type AnalyticsProducer = z.infer<typeof AnalyticsProducerSchema>;
export type AnalyticsDomainEventName = z.infer<
  typeof AnalyticsDomainEventNameSchema
>;
export type AnalyticsDomainFact = z.infer<typeof AnalyticsDomainFactSchema>;

function inspectSensitiveKeys(
  value: unknown,
  path: (string | number)[],
  context: z.RefinementCtx,
): void {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      inspectSensitiveKeys(entry, [...path, index], context),
    );
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replaceAll(/[^a-z0-9_]/g, "");
    if (blockedPropertyNames.has(normalized)) {
      context.addIssue({
        code: "custom",
        message: `Sensitive analytics property is forbidden: ${key}`,
        path: [...path, key],
      });
      continue;
    }
    inspectSensitiveKeys(entry, [...path, key], context);
  }
}
