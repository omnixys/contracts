import { ActorIdDTO } from "./user.dto.js";
export interface GuestTicketKey extends ActorIdDTO {
    eventId: string;
    tickets: Array<{
        invitationId: string;
        seatId: string;
    }>;
}
//# sourceMappingURL=ticket.dto.d.ts.map