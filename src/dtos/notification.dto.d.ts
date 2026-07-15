import { TokenDTO } from "./token.dto.js";
import { UserIdDTO } from "./user.dto.js";
export interface UserCredentialsDTO extends UserIdDTO {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    invitationId?: string;
}
export interface GuestNotificationDTO extends TokenDTO {
    eventName: string;
    seat?: string;
    seatId?: string;
    eventEndsAt: Date;
}
export interface WhatsAppMessageDTO {
    key: string;
    value: {
        id: string;
        chatId: string;
        direction: string;
        from: string;
        to: string;
        body: string | null;
        createdAt: Date;
    };
}
export interface WhatsappOutgoingValueDTO {
    messageId: string;
    to: string;
    message: string;
    retryCount?: number;
    createdAt?: string;
}
export interface WhatsappOutgoingDTO {
    key: string;
    value: WhatsappOutgoingValueDTO;
}
export interface WhatsAppDLQValueDTO extends WhatsappOutgoingValueDTO {
    error: string;
    failedAt: string;
}
export interface WhatsAppDLQDTO {
    key: string;
    value: WhatsAppDLQValueDTO;
}
//# sourceMappingURL=notification.dto.d.ts.map