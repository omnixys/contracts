import {
  ErrorCode,
  createPendingUserSchema,
  guestAuthKeySchema,
  guestNotificationSchema,
  guestSignUpTokenPayloadSchema,
  type CreatePendingUserDTO,
  type GuestAuthKey,
  type GuestNotificationDTO,
  type GuestSignUpTokenPayload,
  type EventMediaUploadedDTO,
  type EventMilestoneRecordedDTO,
} from "../src/index.js";
import type { z } from "zod";

type AssertAssignable<T, U extends T> = U;

type PendingSchemaMatchesDto = AssertAssignable<
  CreatePendingUserDTO,
  z.output<typeof createPendingUserSchema>
>;
type GuestAuthSchemaMatchesDto = AssertAssignable<
  GuestAuthKey,
  z.output<typeof guestAuthKeySchema>
>;
type GuestAuthDtoMatchesSchema = AssertAssignable<
  z.output<typeof guestAuthKeySchema>,
  GuestAuthKey
>;
type NotificationSchemaMatchesDto = AssertAssignable<
  GuestNotificationDTO,
  z.output<typeof guestNotificationSchema>
>;
type TokenSchemaMatchesDto = AssertAssignable<
  GuestSignUpTokenPayload,
  z.output<typeof guestSignUpTokenPayloadSchema>
>;

void (0 as unknown as PendingSchemaMatchesDto);
void (0 as unknown as GuestAuthSchemaMatchesDto);
void (0 as unknown as GuestAuthDtoMatchesSchema);
void (0 as unknown as NotificationSchemaMatchesDto);
void (0 as unknown as TokenSchemaMatchesDto);

const uploadedMedia: EventMediaUploadedDTO = {
  eventId: "event-1",
  mediaId: "media-1",
  key: "event/event-1/media.webp",
  filename: "media.webp",
  mimetype: "image/webp",
  size: 1024,
  type: "GALLERY",
};
void uploadedMedia;

const milestone: EventMilestoneRecordedDTO = {
  eventId: "event-1",
  milestoneId: "milestone-1",
  type: "TICKET_GENERATED",
  label: "Ticket generated",
  occurredAt: new Date(0).toISOString(),
};
void milestone;

const canonicalErrorCode: ErrorCode = ErrorCode.USER_ALREADY_EXISTS;
const wireErrorCode: string = canonicalErrorCode;
void wireErrorCode;
