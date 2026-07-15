import { HttpException } from '@nestjs/common';
interface TooManyRequestsOptions {
    retryAfterSeconds?: number;
    message?: string;
}
/** @deprecated Transport layers should map a transport-neutral rate-limit error. */
export declare class TooManyRequestsException extends HttpException {
    constructor({ retryAfterSeconds, message, }: TooManyRequestsOptions);
}
export {};
//# sourceMappingURL=too-many-requests.exception.d.ts.map