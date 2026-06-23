import { EventIdDTO } from "./event.dto.js";
import { ActorIdDTO, PublicPlusOneDTO, UserActionDTO } from "./user.dto.js";

export interface GuestTicketKey extends ActorIdDTO {
  eventId: string;

  tickets: Array<{
    invitationId: string;
    seatId: string;
  }>;
}
