import {
  getErrorDefinition,
  getPublicErrorMetadata,
} from "./error-definition.js";

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
  /** Server-only diagnostic data. Transport mappers must never serialize it. */
  readonly diagnostics?: Readonly<Record<string, unknown>>;
  readonly cause?: unknown;
  readonly summary?: string;
  readonly httpStatus?: number;
  readonly retryable?: boolean;
}

export class FrameworkException extends Error {
  readonly code: string;
  readonly requestId: string;
  readonly correlationId: string;
  readonly traceId?: string;
  readonly actorId?: string;
  readonly tenantId?: string;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly summary: string;
  readonly httpStatus: number;
  readonly retryable: boolean;
  declare readonly diagnostics: Readonly<Record<string, unknown>>;

  constructor(code: string, options?: FrameworkExceptionOptions);
  constructor(
    code: string,
    message: string,
    options?: FrameworkExceptionOptions,
  );
  constructor(
    code: string,
    messageOrOptions: string | FrameworkExceptionOptions = {},
    explicitOptions: FrameworkExceptionOptions = {},
  ) {
    super(
      typeof messageOrOptions === "string"
        ? messageOrOptions
        : getErrorDefinition(code).defaultMessage,
      {
        cause:
          typeof messageOrOptions === "string"
            ? explicitOptions.cause
            : messageOrOptions.cause,
      },
    );
    const options =
      typeof messageOrOptions === "string"
        ? explicitOptions
        : messageOrOptions;
    this.code = code;
    const definition = getErrorDefinition(code);
    this.name = new.target.name;
    this.summary = options.summary ?? definition.summary;
    this.httpStatus = options.httpStatus ?? definition.httpStatus;
    this.retryable = options.retryable ?? definition.retryable;
    this.requestId = options.context?.requestId ?? "unscoped";
    this.correlationId =
      options.context?.correlationId ??
      options.context?.requestId ??
      "unscoped";
    this.traceId = options.context?.traceId;
    this.actorId = options.context?.actorId;
    this.tenantId = options.context?.tenantId;
    this.metadata = getPublicErrorMetadata(code, options.metadata);
    Object.defineProperty(this, "diagnostics", {
      configurable: false,
      enumerable: false,
      value: Object.freeze({ ...(options.diagnostics ?? {}) }),
      writable: false,
    });
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
