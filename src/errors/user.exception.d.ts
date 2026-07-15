import { FrameworkException, type FrameworkExceptionOptions } from "./framework.exception.js";
export declare class UserNotFoundException extends FrameworkException {
    constructor(userId?: string, options?: FrameworkExceptionOptions);
}
export declare class UserAlreadyExistsException extends FrameworkException {
    constructor(identifier?: string, options?: FrameworkExceptionOptions);
}
export declare class UserEmailAlreadyExistsException extends FrameworkException {
    constructor(email?: string, options?: FrameworkExceptionOptions);
}
//# sourceMappingURL=user.exception.d.ts.map