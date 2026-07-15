import { FrameworkException, type FrameworkExceptionOptions } from "./framework.exception.js";
export declare class InvitationNotFoundException extends FrameworkException {
    constructor(invitationId?: string, options?: FrameworkExceptionOptions);
}
export declare class InvitationAlreadyExistsException extends FrameworkException {
    constructor(invitationId?: string, options?: FrameworkExceptionOptions);
}
export declare class InvitationAlreadyApprovedException extends FrameworkException {
    constructor(invitationId?: string, options?: FrameworkExceptionOptions);
}
//# sourceMappingURL=invitation.exception.d.ts.map