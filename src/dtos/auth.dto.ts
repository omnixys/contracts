import { Locale } from "../types/locale.type.js";
import { PhoneNumberDTO } from "./phone-number.dto.js";
import { ActorIdDTO, PublicPlusOneDTO } from "./user.dto.js";

export interface SendAuthLinkDTO {
  username: string;
  token: string;
  email: string;
  locale: Locale;
  device: string;
  ip: string;
  location: string;
}

export interface CredentialsDTO {
  userId: string;
  username: string;
  password: string;
  invitationId: string;
  lastName: string;
  firstName: string;
}

export interface AddSecurityQuestionDTO {
  questionId: string;
  answer: string;
}

/**
 * Input type for creating a new user.
 * Corresponds to fields in the User entity.
 */
export interface KCSignUpDTO {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  securityQuestions?: AddSecurityQuestionDTO[];
}

export interface GuestAuthKey extends ActorIdDTO {
  /**
   * Identity + minimal auth-relevant data
   */
  tenantId: string;
  invitees: Array<{
    invitationId: string;
    email?: string;
    firstName: string;
    lastName: string;
  }>;
  eventEndsAt: Date;
}
