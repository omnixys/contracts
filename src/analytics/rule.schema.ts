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

export const AnalyticsRuleSetSchema = z
  .object({
    id: z.string().uuid(),
    version: z.number().int().positive(),
    definitionVersion: z.literal("1.0"),
    condition: AnalyticsRuleNodeSchema,
    maxCausationDepth: z.number().int().min(1).max(20).default(5),
  })
  .strict();

export type AnalyticsRuleValue = z.infer<typeof AnalyticsRuleValueSchema>;
export type AnalyticsRuleSet = z.infer<typeof AnalyticsRuleSetSchema>;
