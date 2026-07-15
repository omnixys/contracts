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
export declare class FrameworkException extends Error {
    readonly code: string;
    readonly requestId: string;
    readonly correlationId: string;
    readonly traceId?: string;
    readonly actorId?: string;
    readonly tenantId?: string;
    readonly metadata: Readonly<Record<string, unknown>>;
    constructor(code: string, message: string, options?: FrameworkExceptionOptions);
}
export declare function withMetadata(options: FrameworkExceptionOptions | undefined, metadata: Readonly<Record<string, unknown>>): FrameworkExceptionOptions;
//# sourceMappingURL=framework.exception.d.ts.map