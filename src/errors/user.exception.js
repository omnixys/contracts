import { FrameworkException, withMetadata, } from "./framework.exception.js";
import { ErrorCode } from "./error-code.enum.js";
export class UserNotFoundException extends FrameworkException {
    constructor(userId, options) {
        super(ErrorCode.USER_NOT_FOUND, "User was not found", withMetadata(options, { userId }));
    }
}
export class UserAlreadyExistsException extends FrameworkException {
    constructor(identifier, options) {
        super(ErrorCode.USER_ALREADY_EXISTS, "User already exists", withMetadata(options, { identifier }));
    }
}
export class UserEmailAlreadyExistsException extends FrameworkException {
    constructor(email, options) {
        super(ErrorCode.USER_EMAIL_ALREADY_EXISTS, "A user with this email already exists", withMetadata(options, { email }));
    }
}
