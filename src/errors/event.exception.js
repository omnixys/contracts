import { FrameworkException, withMetadata, } from "./framework.exception.js";
import { ErrorCode } from "./error-code.enum.js";
export class EventNotFoundException extends FrameworkException {
    constructor(eventId, options) {
        super(ErrorCode.EVENT_NOT_FOUND, "Event was not found", withMetadata(options, { eventId }));
    }
}
export class EventAlreadyExistsException extends FrameworkException {
    constructor(eventId, options) {
        super(ErrorCode.EVENT_ALREADY_EXISTS, "Event already exists", withMetadata(options, { eventId }));
    }
}
export class EventClosedException extends FrameworkException {
    constructor(eventId, options) {
        super(ErrorCode.EVENT_CLOSED, "Event is closed", withMetadata(options, { eventId }));
    }
}
