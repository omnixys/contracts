import { HttpException, HttpStatus } from '@nestjs/common';
interface Props { 
  retryAfterSeconds?: number; 
  message?: string
}

export class TooManyRequestsException extends HttpException {
  constructor({retryAfterSeconds = 3600, message = 'Too many requests'}: Props  ) {
    super(
      {
        message,
        retryAfter: retryAfterSeconds,
      },
      HttpStatus.TOO_MANY_REQUESTS
    );
  }
}