import { FrameworkException, type FrameworkExceptionOptions } from "./framework.exception.js";
export declare class TicketNotFoundException extends FrameworkException {
    constructor(ticketId?: string, options?: FrameworkExceptionOptions);
}
export declare class TicketRevokedException extends FrameworkException {
    constructor(ticketId?: string, options?: FrameworkExceptionOptions);
}
export declare class TicketAlreadyScannedException extends FrameworkException {
    constructor(ticketId?: string, options?: FrameworkExceptionOptions);
}
//# sourceMappingURL=ticket.exception.d.ts.map