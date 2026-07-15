import { BadRequestException } from '@nestjs/common';
/**
 * Thrown when a guest has not submitted an RSVP yet.
 */
export declare class RsvpNotSubmittedException extends BadRequestException {
    constructor();
}
/**
 * Thrown when RSVP is not accepted (NO or MAYBE).
 */
export declare class RsvpNotAcceptedException extends BadRequestException {
    constructor();
}
export declare class MissingGuestNameException extends BadRequestException {
    constructor(missing: string[]);
}
export declare class InvitationAlreadyRejectedException extends BadRequestException {
    constructor();
}
export declare class MissingPendingContactException extends BadRequestException {
    constructor();
}
export declare class MissingRsvpContactDetailsException extends BadRequestException {
    constructor();
}
export declare class MissingContactMethodException extends BadRequestException {
    constructor();
}
/**
 * Thrown when invitation is already accepted.
 */
export declare class RsvpAlreadyAcceptedException extends BadRequestException {
    constructor();
}
//# sourceMappingURL=invitation.exception.d.ts.map