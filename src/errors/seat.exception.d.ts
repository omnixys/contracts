import { FrameworkException, type FrameworkExceptionOptions } from "./framework.exception.js";
export declare class SeatNotFoundException extends FrameworkException {
    constructor(seatId?: string, options?: FrameworkExceptionOptions);
}
export declare class SeatAlreadyReservedException extends FrameworkException {
    constructor(seatId?: string, options?: FrameworkExceptionOptions);
}
export declare class SeatCapacityExceededException extends FrameworkException {
    constructor(seatId?: string, options?: FrameworkExceptionOptions);
}
//# sourceMappingURL=seat.exception.d.ts.map