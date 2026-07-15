import type { ConversationChannel } from "../enums/index.js";
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
//# sourceMappingURL=conversation.dto.d.ts.map