import {
  FrameworkException,
  type FrameworkExceptionOptions,
  withMetadata,
} from "./framework.exception.js";
import { ErrorCode } from "./error-code.enum.js";

export class InvitationNotFoundException extends FrameworkException {
  constructor(invitationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.INVITATION_NOT_FOUND,
      "Invitation was not found",
      withMetadata(options, { invitationId }),
    );
  }
}

export class InvitationAlreadyExistsException extends FrameworkException {
  constructor(invitationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.INVITATION_ALREADY_EXISTS,
      "Invitation already exists",
      withMetadata(options, { invitationId }),
    );
  }
}

export class InvitationAlreadyApprovedException extends FrameworkException {
  constructor(invitationId?: string, options?: FrameworkExceptionOptions) {
    super(
      ErrorCode.INVITATION_ALREADY_APPROVED,
      "Invitation has already been approved",
      withMetadata(options, { invitationId }),
    );
  }
}
