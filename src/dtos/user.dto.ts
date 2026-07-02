import { Locale } from "../types/locale.type.js";
import { PhoneNumberDTO } from "./phone-number.dto.js";
import { TokenDTO } from "./token.dto.js";

export interface UserIdDTO {
  userId: string;
}

export interface UserIdListDTO {
  userIds: string[];
}

export interface ActorIdDTO {
  actorId: string;
}

export interface UserActionDTO extends UserIdDTO, ActorIdDTO {}

export interface CreateUserProviderDTO extends UserActionDTO {
  email?: string;
  username?: string;
}

export interface UserTokenDTO extends UserIdDTO, TokenDTO {}

export interface CreateGuestDTO extends UserTokenDTO {
  username: string;
  email: string;
  invitationId: string;
}

export type PlusOneAgeCategoryDTO = "OVER_SIX" | "UNDER_SIX";

export interface PublicPlusOneDTO {
  firstName: string;
  lastName: string;
  email?: string;
  plusOneAgeCategory?: PlusOneAgeCategoryDTO;
}
export interface PublicPlusOneWithIdDTO {
  firstName: string;
  lastName: string;
  email?: string;
  invitationId: string;
  phoneNumbers?: PhoneNumberDTO[];
  plusOneAgeCategory?: PlusOneAgeCategoryDTO;
}

export interface CreatePendingUserDTO extends ActorIdDTO {
  email?: string;
  eventId: string;
  invitationId: string;
  seatId?: string;
  note?: string;
  tenantId?: string;
  firstName: string;
  lastName: string;
  phoneNumbers?: PhoneNumberDTO[];
  plusOneAgeCategory?: PlusOneAgeCategoryDTO;
  locale: Locale;
  plusOnes?: PublicPlusOneWithIdDTO[];
  selectedInvitedBy?: string[];
  guestNote?: string;
  eventEndsAt: Date;
}

export interface GuestUserKey extends ActorIdDTO {
  /**
   * Data required for user creation
   */
  users: Array<{
    invitationId: string;

    firstName: string;
    lastName: string;

    email?: string;
    phoneNumbers?: PhoneNumberDTO[];
    plusOneAgeCategory?: PlusOneAgeCategoryDTO;
  }>;
}

export interface GuestInvitee {
  invitationId: string;

  firstName: string;
  lastName: string;

  email?: string;
  phoneNumbers?: PhoneNumberDTO[];

  isPrimary: boolean;
  plusOneAgeCategory?: PlusOneAgeCategoryDTO;
}

export interface CreatePlusOneAccountDTO {
  firstName: string;
  lastName: string;

  email?: string;
  phoneNumbers?: PhoneNumberDTO[];
  plusOneAgeCategory?: PlusOneAgeCategoryDTO;
}
