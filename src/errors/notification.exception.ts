import {
  FrameworkException,
  type FrameworkExceptionOptions,
  withMetadata,
} from "./framework.exception.js";
import { ErrorCode } from "./error-code.enum.js";

export class NotificationNotFoundException extends FrameworkException {
  constructor(notificationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.NOTIFICATION_NOT_FOUND,
      "Notification was not found",
      withMetadata(options, { notificationId }),
    );
  }
}

export class NotificationChannelUnavailableException extends FrameworkException {
  constructor(channel?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.NOTIFICATION_CHANNEL_UNAVAILABLE,
      "Notification channel is unavailable",
      withMetadata(options, { channel }),
    );
  }
}
