import { TokenDTO } from "./token.dto.js";
import { ActorIdDTO, PublicPlusOneDTO, UserIdDTO } from "./user.dto.js";
import { EventRoleType } from '../enums/event-role-type.enum.js';

export interface EventIdDTO {
  eventId: string;
}

export interface EventIdsDTO {
  eventIds: string[];
}

export interface EventCancelNotificationDTO extends EventIdsDTO {
  admins: string[];
  security: string[];
  guests: string[];
}

export interface EventActionDTO extends EventIdDTO, ActorIdDTO {}

export type EventMediaType = "COVER" | "LOGO" | "GALLERY";

/** Payload emitted after an event media object is durably stored. */
export interface EventMediaUploadedDTO extends EventIdDTO {
  mediaId: string;
  key: string;
  filename: string;
  mimetype: string;
  size?: number;
  type: EventMediaType;
}

export type EventMilestoneType =
  | "INVITATION_CREATED"
  | "INVITATION_APPROVED"
  | "TICKET_GENERATED"
  | "TICKET_REVOKED"
  | "TICKET_SCANNED";

/** Additive cross-service event timeline contribution. */
export interface EventMilestoneRecordedDTO extends EventIdDTO {
  milestoneId: string;
  type: EventMilestoneType;
  label: string;
  occurredAt: string;
  referenceId?: string;
}

export interface GuestEventKey extends ActorIdDTO {
  eventId: string;

  /**
   * Only references → no duplication
   */
  invitationIds: string[];
}

/** @version 1.0 */
export interface EventRoleAssignedDTO extends EventIdDTO {
  userId: string;
  role: EventRoleType;
  assignedBy: string;
  occurredAt: string;
}

/** @version 1.0 */
export interface EventRoleRemovedDTO extends EventIdDTO {
  userId: string;
  oldRole: EventRoleType;
  removedBy: string;
  occurredAt: string;
}

/** @version 1.0 */
export interface EventOwnerChangedDTO extends EventIdDTO {
  oldOwnerId: string;
  newOwnerId: string;
  changedBy: string;
  occurredAt: string;
}

/** Broadcast when an event is created — carries all settings downstream services need. */
export interface EventCreatedDTO extends EventIdDTO {
  name: string;
  endsAt: string;
  approvalMode: string;
  maxSeats: number;
  startsAt: string;
  allowPublicRsvp: boolean;
  allowPublicPlusOne: boolean;
  allowGuestSeatSelection: boolean;
  ticketReleaseAt?: string;
  rsvpDeadline?: string;
  category?: string;
  occurredAt: string;
}

/** Broadcast when an event settings are updated — all fields optional, full replacement. */
export interface EventUpdatedDTO extends EventIdDTO {
  name?: string;
  endsAt?: string;
  approvalMode?: string;
  maxSeats?: number;
  startsAt?: string;
  allowPublicRsvp?: boolean;
  allowPublicPlusOne?: boolean;
  allowGuestSeatSelection?: boolean;
  ticketReleaseAt?: string;
  rsvpDeadline?: string;
  category?: string;
  occurredAt: string;
}
