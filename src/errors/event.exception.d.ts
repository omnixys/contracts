import { FrameworkException, type FrameworkExceptionOptions } from "./framework.exception.js";
export declare class EventNotFoundException extends FrameworkException {
    constructor(eventId?: string, options?: FrameworkExceptionOptions);
}
export declare class EventAlreadyExistsException extends FrameworkException {
    constructor(eventId?: string, options?: FrameworkExceptionOptions);
}
export declare class EventClosedException extends FrameworkException {
    constructor(eventId?: string, options?: FrameworkExceptionOptions);
}
//# sourceMappingURL=event.exception.d.ts.map