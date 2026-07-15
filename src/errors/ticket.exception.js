import { FrameworkException, withMetadata, } from "./framework.exception.js";
import { ErrorCode } from "./error-code.enum.js";
export class TicketNotFoundException extends FrameworkException {
    constructor(ticketId, options) {
        super(ErrorCode.TICKET_NOT_FOUND, "Ticket was not found", withMetadata(options, { ticketId }));
    }
}
export class TicketRevokedException extends FrameworkException {
    constructor(ticketId, options) {
        super(ErrorCode.TICKET_REVOKED, "Ticket has been revoked", withMetadata(options, { ticketId }));
    }
}
export class TicketAlreadyScannedException extends FrameworkException {
    constructor(ticketId, options) {
        super(ErrorCode.TICKET_ALREADY_SCANNED, "Ticket has already been scanned", withMetadata(options, { ticketId }));
    }
}
