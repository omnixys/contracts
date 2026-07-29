import { z } from "zod";

export const AnalyticsEnvironmentSchema = z.enum([
  "development",
  "staging",
  "production",
]);
export const AnalyticsLifecycleSchema = z.enum([
  "DRAFT",
  "ACTIVE",
  "DEPRECATED",
  "ARCHIVED",
]);
export const AnalyticsEventTypeSchema = z.enum([
  "track",
  "identify",
  "page",
  "screen",
  "group",
  "alias",
]);
export const TrackingPlanModeSchema = z.enum([
  "monitor",
  "warn",
  "quarantine",
  "reject",
]);

const PropertiesSchema = z.record(z.string().min(1), z.unknown());

export const AnalyticsEventContextSchema = z
  .object({
    locale: z.string().min(2).max(35).optional(),
    timezone: z.string().min(1).max(100).optional(),
    page: z
      .object({
        url: z.string().url().max(2048).optional(),
        path: z.string().max(2048).optional(),
        title: z.string().max(512).optional(),
        referrer: z.string().url().max(2048).optional(),
      })
      .strict()
      .optional(),
    device: z
      .object({
        type: z.string().max(64).optional(),
        platform: z.string().max(64).optional(),
        userAgent: z.string().max(1024).optional(),
      })
      .strict()
      .optional(),
    campaign: z.record(z.string(), z.string().max(1024)).optional(),
  })
  .strict();

export const AnalyticsEventSchema = z
  .object({
    eventId: z.string().uuid(),
    schemaVersion: z.string().regex(/^\d+\.\d+$/),
    type: AnalyticsEventTypeSchema,
    name: z.string().min(1).max(200),
    anonymousId: z.string().min(1).max(256).optional(),
    userId: z.string().min(1).max(256).optional(),
    groupId: z.string().min(1).max(256).optional(),
    sessionId: z.string().min(1).max(256).optional(),
    occurredAt: z.string().datetime({ offset: true }),
    properties: PropertiesSchema.default({}),
    traits: PropertiesSchema.optional(),
    context: AnalyticsEventContextSchema.optional(),
    consent: z.enum(["granted", "denied", "unknown"]).default("unknown"),
    sdk: z
      .object({
        name: z.string().min(1).max(100),
        version: z.string().min(1).max(50),
      })
      .strict(),
    correlationId: z.string().min(1).max(256).optional(),
  })
  .strict()
  .superRefine((event, context) => {
    if (!event.anonymousId && !event.userId && event.type !== "group") {
      context.addIssue({
        code: "custom",
        message: "anonymousId or userId is required",
        path: ["anonymousId"],
      });
    }
    if (event.type === "group" && !event.groupId) {
      context.addIssue({
        code: "custom",
        message: "groupId is required for group events",
        path: ["groupId"],
      });
    }
  });

export const AnalyticsBatchRequestSchema = z
  .object({
    batchId: z.string().uuid(),
    sentAt: z.string().datetime({ offset: true }),
    events: z.array(AnalyticsEventSchema).min(1).max(100),
  })
  .strict();

export const AnalyticsBatchIssueSchema = z
  .object({
    index: z.number().int().min(0),
    code: z.string().min(1).max(100),
    message: z.string().min(1).max(512),
    path: z.array(z.union([z.string(), z.number()])).default([]),
  })
  .strict();

export const AnalyticsBatchResponseSchema = z
  .object({
    batchId: z.string().uuid(),
    accepted: z.number().int().min(0),
    rejected: z.number().int().min(0),
    quarantined: z.number().int().min(0).default(0),
    issues: z.array(AnalyticsBatchIssueSchema).default([]),
  })
  .strict();

export const AnalyticsProcessingEventSchema = z
  .object({
    organizationId: z.string().uuid(),
    workspaceId: z.string().uuid(),
    sourceId: z.string().uuid(),
    environment: AnalyticsEnvironmentSchema,
    receivedAt: z.string().datetime({ offset: true }),
    processingVersion: z.string().min(1).max(100),
    event: AnalyticsEventSchema,
  })
  .strict();

export const AnalyticsDataQualityIssueSchema = z
  .object({
    organizationId: z.string().uuid(),
    workspaceId: z.string().uuid(),
    sourceId: z.string().uuid(),
    environment: AnalyticsEnvironmentSchema,
    eventId: z.string().uuid(),
    mode: TrackingPlanModeSchema,
    code: z.string().min(1).max(100),
    message: z.string().min(1).max(1024),
    path: z.array(z.union([z.string(), z.number()])).default([]),
    occurredAt: z.string().datetime({ offset: true }),
  })
  .strict();

export const AnalyticsResourceEventSchema = z
  .object({
    organizationId: z.string().uuid(),
    workspaceId: z.string().uuid(),
    resourceType: z.string().min(1).max(100),
    resourceId: z.string().min(1).max(256),
    action: z.string().min(1).max(100),
    occurredAt: z.string().datetime({ offset: true }),
    data: z.record(z.string(), z.unknown()).default({}),
  })
  .strict();

export const AnalyticsJobEventSchema = z
  .object({
    organizationId: z.string().uuid(),
    workspaceId: z.string().uuid(),
    jobType: z.string().min(1).max(100),
    jobId: z.string().uuid(),
    status: z.enum([
      "requested",
      "running",
      "completed",
      "failed",
      "canceled",
    ]),
    occurredAt: z.string().datetime({ offset: true }),
    error: z.string().max(2048).optional(),
    data: z.record(z.string(), z.unknown()).default({}),
  })
  .strict();

export const EventPropertyDefinitionSchema = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    type: z.enum([
      "string",
      "number",
      "boolean",
      "datetime",
      "object",
      "array",
    ]),
    required: z.boolean().default(false),
    privacy: z.enum(["none", "personal", "sensitive"]).default("none"),
  })
  .strict();

export const AnalyticsEventDefinitionSchema = z
  .object({
    id: z.string().uuid(),
    organizationId: z.string().uuid(),
    workspaceId: z.string().uuid(),
    sourceId: z.string().uuid(),
    environment: AnalyticsEnvironmentSchema,
    name: z.string().min(1).max(200),
    description: z.string().max(4000).optional(),
    owner: z.string().min(1).max(256),
    schemaVersion: z.string().regex(/^\d+\.\d+$/),
    lifecycle: AnalyticsLifecycleSchema,
    properties: z.array(EventPropertyDefinitionSchema),
    replacementId: z.string().uuid().optional(),
  })
  .strict();

export const TrackingPlanSchema = z
  .object({
    id: z.string().uuid(),
    organizationId: z.string().uuid(),
    workspaceId: z.string().uuid(),
    sourceId: z.string().uuid(),
    environment: AnalyticsEnvironmentSchema,
    version: z.number().int().positive(),
    mode: TrackingPlanModeSchema,
    lifecycle: AnalyticsLifecycleSchema,
    eventDefinitionIds: z.array(z.string().uuid()),
  })
  .strict();

export type AnalyticsEnvironment = z.infer<typeof AnalyticsEnvironmentSchema>;
export type AnalyticsLifecycle = z.infer<typeof AnalyticsLifecycleSchema>;
export type AnalyticsEventType = z.infer<typeof AnalyticsEventTypeSchema>;
export type TrackingPlanMode = z.infer<typeof TrackingPlanModeSchema>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type AnalyticsBatchRequest = z.infer<typeof AnalyticsBatchRequestSchema>;
export type AnalyticsBatchIssue = z.infer<typeof AnalyticsBatchIssueSchema>;
export type AnalyticsBatchResponse = z.infer<typeof AnalyticsBatchResponseSchema>;
export type AnalyticsProcessingEvent = z.infer<
  typeof AnalyticsProcessingEventSchema
>;
export type AnalyticsDataQualityIssue = z.infer<
  typeof AnalyticsDataQualityIssueSchema
>;
export type AnalyticsResourceEvent = z.infer<
  typeof AnalyticsResourceEventSchema
>;
export type AnalyticsJobEvent = z.infer<typeof AnalyticsJobEventSchema>;
export type AnalyticsEventDefinition = z.infer<
  typeof AnalyticsEventDefinitionSchema
>;
export type TrackingPlan = z.infer<typeof TrackingPlanSchema>;
