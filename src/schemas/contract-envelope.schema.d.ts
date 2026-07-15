import { z } from "zod";
export declare const contractMetadataSchema: z.ZodObject<{
    requestId: z.ZodString;
    correlationId: z.ZodString;
    traceId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    tenantId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare function contractEnvelopeSchema<T extends z.ZodType>(payload: T): z.ZodObject<{
    schemaVersion: z.ZodString;
    occurredAt: z.ZodISODateTime;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        correlationId: z.ZodString;
        traceId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        tenantId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    payload: T;
}, z.core.$strip>;
//# sourceMappingURL=contract-envelope.schema.d.ts.map