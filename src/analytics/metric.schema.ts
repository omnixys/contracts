import { z } from "zod";
import { AnalyticsRuleNodeSchema } from "./rule.schema.js";

export const MetricAggregationSchema = z.discriminatedUnion("operation", [
  z.object({ operation: z.literal("count") }).strict(),
  z
    .object({
      operation: z.enum(["sum", "average", "min", "max", "duration"]),
      property: z.string().min(1).max(200),
    })
    .strict(),
  z
    .object({
      operation: z.literal("unique_count"),
      property: z.string().min(1).max(200).optional(),
    })
    .strict(),
  z
    .object({
      operation: z.literal("conversion"),
      numeratorEvent: z.string().min(1).max(200),
      denominatorEvent: z.string().min(1).max(200),
    })
    .strict(),
]);

export const MetricQueryDefinitionSchema = z
  .object({
    definitionVersion: z.literal("1.0"),
    eventName: z.string().min(1).max(200).optional(),
    aggregation: MetricAggregationSchema,
    filter: AnalyticsRuleNodeSchema.optional(),
    dimensions: z.array(z.string().min(1).max(200)).max(5).default([]),
    bucketSize: z.enum(["1m", "5m", "15m", "1h", "1d"]).default("1h"),
  })
  .strict();

const KpiExpressionSchema: z.ZodType<KpiExpression> = z.lazy(() =>
  z.union([
    z.object({ metricId: z.string().uuid() }).strict(),
    z.object({ constant: z.number().finite() }).strict(),
    z
      .object({
        operator: z.enum(["add", "subtract", "multiply", "divide"]),
        left: KpiExpressionSchema,
        right: KpiExpressionSchema,
      })
      .strict(),
  ]),
);

export const KpiDefinitionSchema = z
  .object({
    definitionVersion: z.literal("1.0"),
    expression: KpiExpressionSchema,
    format: z.enum(["number", "percentage", "duration", "currency"]),
    unit: z.string().min(1).max(30).optional(),
  })
  .strict();

export type MetricAggregation = z.infer<typeof MetricAggregationSchema>;
export type MetricQueryDefinition = z.infer<
  typeof MetricQueryDefinitionSchema
>;
export type KpiExpression =
  | { metricId: string }
  | { constant: number }
  | {
      operator: "add" | "subtract" | "multiply" | "divide";
      left: KpiExpression;
      right: KpiExpression;
    };
export type KpiDefinition = z.infer<typeof KpiDefinitionSchema>;
