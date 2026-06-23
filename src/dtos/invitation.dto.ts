import { UserActionDTO, UserIdDTO, UserTokenDTO } from "./user.dto.js";

export interface AddGuestIdToInvitationDTO extends UserActionDTO {
  invitationId: string;
}

export interface CreateUserWithInvitationIdDTO extends UserTokenDTO {
  invitationId: string;
}
