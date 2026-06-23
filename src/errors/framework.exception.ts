export interface FrameworkErrorContext {
  readonly requestId?: string;
  readonly correlationId?: string;
  readonly traceId?: string;
  readonly actorId?: string;
  readonly tenantId?: string;
}

export interface FrameworkExceptionOptions {
  readonly context?: FrameworkErrorContext;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly cause?: unknown;
}

export class FrameworkException extends Error {
  readonly requestId: string;
  readonly correlationId: string;
  readonly traceId?: string;
  readonly actorId?: string;
  readonly tenantId?: string;
  readonly metadata: Readonly<Record<string, unknown>>;

  constructor(
    readonly code: string,
    message: string,
    options: FrameworkExceptionOptions = {},
  ) {
    super(message, { cause: options.cause });
    this.name = new.target.name;
    this.requestId = options.context?.requestId ?? "unscoped";
    this.correlationId =
      options.context?.correlationId ??
      options.context?.requestId ??
      "unscoped";
    this.traceId = options.context?.traceId;
    this.actorId = options.context?.actorId;
    this.tenantId = options.context?.tenantId;
    this.metadata = Object.freeze({ ...(options.metadata ?? {}) });
  }
}

export function withMetadata(
  options: FrameworkExceptionOptions | undefined,
  metadata: Readonly<Record<string, unknown>>,
): FrameworkExceptionOptions {
  return {
    ...options,
    metadata: { ...metadata, ...(options?.metadata ?? {}) },
  };
}
