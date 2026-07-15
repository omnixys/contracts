import { HttpException, HttpStatus } from '@nestjs/common';
/** @deprecated Transport layers should map a transport-neutral rate-limit error. */
export class TooManyRequestsException extends HttpException {
    constructor({ retryAfterSeconds = 3600, message = 'Too many requests', }) {
        super({
            code: 'RATE_LIMIT_EXCEEDED',
            message,
            retryAfter: retryAfterSeconds,
        }, HttpStatus.TOO_MANY_REQUESTS);
    }
}
