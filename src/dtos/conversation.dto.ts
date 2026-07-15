import type { ConversationChannel, ConversationStatus, ConversationPriority } from "../enums/index.js";

export interface ConversationCreatedDTO {
  conversationId: string;
  eventId: string;
  invitationId?: string;
  guestUserId?: string;
  guestName: string;
  channel: ConversationChannel;
  firstMessage: string;
}

export interface AgentRepliedDTO {
  conversationId: string;
  messageId: string;
  channel: ConversationChannel;
  body: string;
  assignedTo: string;
}

export interface GuestRepliedDTO {
  conversationId: string;
  messageId: string;
  channel: ConversationChannel;
  body: string;
}

export interface ConversationChatAssignedDTO {
  conversationId: string;
  assignedTo: string;
  assignedBy: string;
}

export interface ConversationChatClosedDTO {
  conversationId: string;
  closedBy: string;
}

export interface ConversationChannelMessageDTO {
  conversationId: string;
  channel: ConversationChannel;
  to: string;
  body: string;
  externalId?: string;
}

export interface SupportMessageReceivedDTO {
  id: string;
  conversationId: string;
  direction: "INBOUND" | "OUTBOUND";
  channel: string;
  fromUserId?: string;
  fromGuest: boolean;
  body?: string;
  mediaUrl?: string;
  mimeType?: string;
  status: string;
  createdAt: string;
}

export interface ConversationMappingDTO {
  id: string;
  channel: ConversationChannel;
  externalId: string;
  eventId?: string;
  conversationId?: string;
  mappingType: "AUTO" | "MANUAL" | "FALLBACK";
  metadata?: Record<string, unknown>;
}

export interface CreateConversationMappingDTO {
  channel: ConversationChannel;
  externalId: string;
  eventId: string;
  conversationId: string;
  mappingType?: "AUTO" | "MANUAL" | "FALLBACK";
}

// ── Internal Communication ─────────────────────────────────

export interface InternalConversationCreatedDTO {
  conversationId: string;
  eventId: string;
  title: string;
  type: "BROADCAST" | "DIRECT" | "ROLE_CHANNEL";
  roleId?: string;
  createdBy: string;
}

export interface InternalMessageSentDTO {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  createdAt: string;
  participantIds?: string[];
}

export interface InternalReadReceiptDTO {
  conversationId: string;
  userId: string;
  lastReadAt: string;
}

// ── Email ──────────────────────────────────────────────────

export interface EmailReceivedDTO {
  messageId: string;
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  htmlBody?: string;
  inReplyTo?: string;
  references?: string;
  attachments?: Array<{
    filename: string;
    contentType: string;
    size: number;
    content: string; // base64
  }>;
  receivedAt: string;
}

export interface EmailOutboundDTO {
  to: string;
  subject: string;
  body: string;
  htmlBody?: string;
  inReplyTo?: string;
  references?: string;
  messageId?: string;
  conversationId?: string;
}

// ── Delivery ──────────────────────────────────────────────

export interface DeliveryStatusDTO {
  messageId: string;
  providerMessageId?: string;
  conversationId: string;
  channel: string;
  status: "SENT" | "DELIVERED" | "READ" | "FAILED";
  error?: string;
  timestamp: string;
}

// ── Escalation ────────────────────────────────────────────

export interface EscalationDTO {
  conversationId: string;
  escalatedTo: string;
  escalatedBy: string;
  reason?: string;
  escalatedAt: string;
}
