import { z } from "zod";
import { actorIdSchema, correlationIdSchema, requestIdSchema, tenantIdSchema, } from "./identity.schema.js";
export const contractMetadataSchema = z.object({
    requestId: requestIdSchema,
    correlationId: correlationIdSchema,
    traceId: z
        .string()
        .regex(/^[a-f0-9]{32}$/i)
        .optional(),
    actorId: actorIdSchema.optional(),
    tenantId: tenantIdSchema.optional(),
});
export function contractEnvelopeSchema(payload) {
    return z.object({
        schemaVersion: z.string().regex(/^\d+\.\d+$/),
        occurredAt: z.iso.datetime(),
        metadata: contractMetadataSchema,
        payload,
    });
}
