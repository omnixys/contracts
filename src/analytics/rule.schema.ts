import { z } from "zod";

export const AnalyticsRuleValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])),
]);

export const AnalyticsRuleFactSchema = z
  .object({ fact: z.string().min(1).max(256) })
  .strict();

const ComparisonSchema = z
  .object({
    operator: z.enum([
      "eq",
      "neq",
      "gt",
      "gte",
      "lt",
      "lte",
      "contains",
      "startsWith",
      "exists",
      "in",
      "notIn",
    ]),
    left: AnalyticsRuleFactSchema,
    right: AnalyticsRuleValueSchema.optional(),
  })
  .strict();

export type AnalyticsRuleNode =
  | z.infer<typeof ComparisonSchema>
  | { all: AnalyticsRuleNode[] }
  | { any: AnalyticsRuleNode[] }
  | { not: AnalyticsRuleNode };

export const AnalyticsRuleNodeSchema: z.ZodType<AnalyticsRuleNode> = z.lazy(
  () =>
    z.union([
      ComparisonSchema,
      z.object({ all: z.array(AnalyticsRuleNodeSchema).min(1) }).strict(),
      z.object({ any: z.array(AnalyticsRuleNodeSchema).min(1) }).strict(),
      z.object({ not: AnalyticsRuleNodeSchema }).strict(),
    ]),
);

export const AnalyticsRuleActionSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("TAG_IDENTITY"),
      tag: z.string().min(1).max(100),
    })
    .strict(),
  z
    .object({
      type: z.literal("PUBLISH_EVENT"),
      eventName: z.string().min(1).max(200),
      data: z.record(z.string(), z.unknown()).default({}),
    })
    .strict(),
  z
    .object({
      type: z.literal("UPDATE_AUDIENCE"),
      audienceId: z.string().uuid(),
      operation: z.enum(["ADD", "REMOVE"]),
    })
    .strict(),
  z
    .object({
      type: z.literal("TRIGGER_ALERT"),
      alertRuleId: z.string().uuid(),
      dimensions: z.record(z.string(), z.unknown()).default({}),
    })
    .strict(),
  z
    .object({
      type: z.literal("TRIGGER_NOTIFICATION"),
      templateId: z.string().min(1).max(200),
      channel: z.enum(["EMAIL", "WHATSAPP", "IN_APP"]),
      recipientFact: z.string().min(1).max(256),
    })
    .strict(),
  z
    .object({
      type: z.literal("WEBHOOK"),
      endpointId: z.string().uuid(),
      eventName: z.string().min(1).max(200),
    })
    .strict(),
]);

export const AnalyticsRuleSetSchema = z
  .object({
    id: z.string().uuid(),
    version: z.number().int().positive(),
    definitionVersion: z.literal("1.0"),
    condition: AnalyticsRuleNodeSchema,
    triggerEventNames: z.array(z.string().min(1).max(200)).max(100).default([]),
    actions: z.array(AnalyticsRuleActionSchema).max(20).default([]),
    cooldownSeconds: z.number().int().min(0).max(2_592_000).default(0),
    maxCausationDepth: z.number().int().min(1).max(20).default(5),
  })
  .strict();

export type AnalyticsRuleValue = z.infer<typeof AnalyticsRuleValueSchema>;
export type AnalyticsRuleAction = z.infer<typeof AnalyticsRuleActionSchema>;
export type AnalyticsRuleSet = z.infer<typeof AnalyticsRuleSetSchema>;
