import { UserActionDTO, UserTokenDTO } from "./user.dto.js";
export interface AddGuestIdToInvitationDTO extends UserActionDTO {
    invitationId: string;
}
export interface CreateUserWithInvitationIdDTO extends UserTokenDTO {
    invitationId: string;
}
export interface InvitationSeatingInfoUpdatedDTO {
    eventId: string;
    invitationId: string;
    guestId: string;
    selectedInvitedBy: string[];
}
//# sourceMappingURL=invitation.dto.d.ts.map