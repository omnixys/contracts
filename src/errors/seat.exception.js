import { FrameworkException, withMetadata, } from "./framework.exception.js";
import { ErrorCode } from "./error-code.enum.js";
export class SeatNotFoundException extends FrameworkException {
    constructor(seatId, options) {
        super(ErrorCode.SEAT_NOT_FOUND, "Seat was not found", withMetadata(options, { seatId }));
    }
}
export class SeatAlreadyReservedException extends FrameworkException {
    constructor(seatId, options) {
        super(ErrorCode.SEAT_ALREADY_RESERVED, "Seat is already reserved", withMetadata(options, { seatId }));
    }
}
export class SeatCapacityExceededException extends FrameworkException {
    constructor(seatId, options) {
        super(ErrorCode.SEAT_CAPACITY_EXCEEDED, "Seat capacity has been exceeded", withMetadata(options, { seatId }));
    }
}
