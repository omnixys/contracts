import { ActorIdDTO, UserIdDTO } from "./user.dto.js";
export interface TokenDTO {
    token: string;
}
export interface TokenUserActionDTO extends TokenDTO, ActorIdDTO, UserIdDTO {
}
export interface SignUpTokenPayload {
    addressKey: string;
    authKey: string;
    userKey: string;
    timestamp?: number;
}
export interface GuestSignUpTokenPayload {
    authKey: string;
    userKey: string;
    eventKey: string;
    seatKey: string;
    timestamp?: number;
    eventEndAt?: Date;
}
//# sourceMappingURL=token.dto.d.ts.map