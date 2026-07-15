import { BadRequestException } from '@nestjs/common';
/**
 * Thrown when a guest has not submitted an RSVP yet.
 */
export class RsvpNotSubmittedException extends BadRequestException {
    constructor() {
        super({
            code: 'RSVP_NOT_SUBMITTED',
            message: 'Guest has not submitted an RSVP yet.',
        });
    }
}
/**
 * Thrown when RSVP is not accepted (NO or MAYBE).
 */
export class RsvpNotAcceptedException extends BadRequestException {
    constructor() {
        super({
            code: 'RSVP_NOT_ACCEPTED',
            message: 'Guest must accept the RSVP before approval.',
            errorId: 2001,
        });
    }
}
// export class InvitationNotFoundException extends NotFoundException {
//   constructor(invitationId?: string) {
//     super({
//       code: 'INVITATION_NOT_FOUND',
//       message: invitationId
//         ? `Invitation with id ${invitationId} not found.`
//         : 'Invitation not found.',
//       errorId: 2000,
//     });
//   }
// }
export class MissingGuestNameException extends BadRequestException {
    constructor(missing) {
        super({
            code: 'MISSING_GUEST_NAME',
            message: `Missing required fields: ${missing.join(', ')}`,
            errorId: 2005,
        });
    }
}
// export class InvitationAlreadyApprovedException extends BadRequestException {
//   constructor() {
//     super({
//       code: 'INVITATION_ALREADY_APPROVED',
//       message: 'Invitation has already been approved.',
//       errorId: 2004,
//     });
//   }
// }
export class InvitationAlreadyRejectedException extends BadRequestException {
    constructor() {
        super({
            code: 'INVITATION_ALREADY_REJECTED',
            message: 'Invitation has already been rejected.',
            errorId: 2006,
        });
    }
}
export class MissingPendingContactException extends BadRequestException {
    constructor() {
        super({
            code: 'MISSING_PENDING_CONTACT',
            message: 'Pending contact token is missing.',
            errorId: 2007,
        });
    }
}
export class MissingRsvpContactDetailsException extends BadRequestException {
    constructor() {
        super({
            code: 'MISSING_RSVP_CONTACT_DETAILS',
            message: 'Contact details are required to complete RSVP.',
            errorId: 2008,
        });
    }
}
export class MissingContactMethodException extends BadRequestException {
    constructor() {
        super({
            code: 'MISSING_CONTACT_METHOD',
            message: 'Either email or phone number must be provided.',
            errorId: 2009,
        });
    }
}
/**
 * Thrown when invitation is already accepted.
 */
export class RsvpAlreadyAcceptedException extends BadRequestException {
    constructor() {
        super({
            code: 'RSVP_ALREADY_ACCEPTED',
            message: 'Invitation has already been accepted.',
            errorId: 2010,
        });
    }
}
