import { FrameworkException, type FrameworkExceptionOptions } from "./framework.exception.js";
export declare class NotificationNotFoundException extends FrameworkException {
    constructor(notificationId?: string, options?: FrameworkExceptionOptions);
}
export declare class NotificationChannelUnavailableException extends FrameworkException {
    constructor(channel?: string, options?: FrameworkExceptionOptions);
}
//# sourceMappingURL=notification.exception.d.ts.map