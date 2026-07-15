import {
  FrameworkException,
  type FrameworkExceptionOptions,
  withMetadata,
} from "./framework.exception.js";
import { ErrorCode } from "./error-code.enum.js";

export class ConversationNotFoundException extends FrameworkException {
  constructor(conversationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.CONVERSATION_NOT_FOUND,
      "Conversation was not found",
      withMetadata(options, { conversationId }),
    );
  }
}

export class ConversationAccessDeniedException extends FrameworkException {
  constructor(conversationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.CONVERSATION_ACCESS_DENIED,
      "Access denied to conversation",
      withMetadata(options, { conversationId }),
    );
  }
}

export class ConversationStateInvalidException extends FrameworkException {
  constructor(conversationId?: string, state?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.CONVERSATION_STATE_INVALID,
      "Conversation is in an invalid state for this operation",
      withMetadata(options, { conversationId, state }),
    );
  }
}

export class ConversationAssignmentConflictException extends FrameworkException {
  constructor(conversationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.CONVERSATION_ASSIGNMENT_CONFLICT,
      "Assignment conflict on conversation",
      withMetadata(options, { conversationId }),
    );
  }
}

export class ConversationClosedException extends FrameworkException {
  constructor(conversationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.CONVERSATION_CLOSED,
      "Conversation is closed",
      withMetadata(options, { conversationId }),
    );
  }
}

export class ConversationChannelUnavailableException extends FrameworkException {
  constructor(channel?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.CONVERSATION_CHANNEL_UNAVAILABLE,
      "Conversation channel is unavailable",
      withMetadata(options, { channel }),
    );
  }
}

export class ConversationDuplicateException extends FrameworkException {
  constructor(conversationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.CONVERSATION_DUPLICATE,
      "A conversation with these parameters already exists",
      withMetadata(options, { conversationId }),
    );
  }
}

export class QuickReplyNotFoundException extends FrameworkException {
  constructor(key?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.QUICK_REPLY_NOT_FOUND,
      "Quick reply was not found",
      withMetadata(options, { key }),
    );
  }
}

export class QuickReplyDuplicateException extends FrameworkException {
  constructor(key?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.QUICK_REPLY_DUPLICATE,
      "Quick reply with this key already exists",
      withMetadata(options, { key }),
    );
  }
}
