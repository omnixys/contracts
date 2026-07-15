export class FrameworkException extends Error {
    code;
    requestId;
    correlationId;
    traceId;
    actorId;
    tenantId;
    metadata;
    constructor(code, message, options = {}) {
        super(message, { cause: options.cause });
        this.code = code;
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
export function withMetadata(options, metadata) {
    return {
        ...options,
        metadata: { ...metadata, ...(options?.metadata ?? {}) },
    };
}
