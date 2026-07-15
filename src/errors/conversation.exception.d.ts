import { FrameworkException, type FrameworkExceptionOptions } from "./framework.exception.js";
export declare class ConversationNotFoundException extends FrameworkException {
    constructor(conversationId?: string, options?: FrameworkExceptionOptions);
}
export declare class ConversationAccessDeniedException extends FrameworkException {
    constructor(conversationId?: string, options?: FrameworkExceptionOptions);
}
export declare class ConversationStateInvalidException extends FrameworkException {
    constructor(conversationId?: string, state?: string, options?: FrameworkExceptionOptions);
}
export declare class ConversationAssignmentConflictException extends FrameworkException {
    constructor(conversationId?: string, options?: FrameworkExceptionOptions);
}
export declare class ConversationClosedException extends FrameworkException {
    constructor(conversationId?: string, options?: FrameworkExceptionOptions);
}
export declare class ConversationChannelUnavailableException extends FrameworkException {
    constructor(channel?: string, options?: FrameworkExceptionOptions);
}
export declare class ConversationDuplicateException extends FrameworkException {
    constructor(conversationId?: string, options?: FrameworkExceptionOptions);
}
export declare class QuickReplyNotFoundException extends FrameworkException {
    constructor(key?: string, options?: FrameworkExceptionOptions);
}
export declare class QuickReplyDuplicateException extends FrameworkException {
    constructor(key?: string, options?: FrameworkExceptionOptions);
}
//# sourceMappingURL=conversation.exception.d.ts.map