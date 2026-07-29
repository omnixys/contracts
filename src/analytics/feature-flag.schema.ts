import { z } from "zod";
import { AnalyticsRuleNodeSchema } from "./rule.schema.js";

export const FeatureFlagVariantValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.record(z.string(), z.unknown()),
]);

export const FeatureFlagVariantSchema = z
  .object({
    key: z.string().min(1).max(100),
    value: FeatureFlagVariantValueSchema,
    weight: z.number().int().min(0).max(10_000),
  })
  .strict();

export const FeatureFlagRuleSchema = z
  .object({
    id: z.string().uuid(),
    condition: AnalyticsRuleNodeSchema,
    rollout: z.number().int().min(0).max(10_000).default(10_000),
    variants: z.array(FeatureFlagVariantSchema).min(1),
  })
  .strict()
  .superRefine(validateWeights);

export const FeatureFlagDefinitionSchema = z
  .object({
    definitionVersion: z.literal("1.0"),
    revision: z.number().int().positive(),
    enabled: z.boolean(),
    defaultVariant: z.string().min(1).max(100),
    offVariant: z.string().min(1).max(100),
    variants: z.array(FeatureFlagVariantSchema).min(1),
    rules: z.array(FeatureFlagRuleSchema).max(100).default([]),
  })
  .strict()
  .superRefine((definition, context) => {
    validateWeights(definition, context);
    const keys = new Set(definition.variants.map(({ key }) => key));
    if (!keys.has(definition.defaultVariant)) {
      context.addIssue({
        code: "custom",
        path: ["defaultVariant"],
        message: "Default variant must exist in variants",
      });
    }
    if (!keys.has(definition.offVariant)) {
      context.addIssue({
        code: "custom",
        path: ["offVariant"],
        message: "Off variant must exist in variants",
      });
    }
  });

export const FeatureFlagEvaluationRequestSchema = z
  .object({
    keys: z.array(z.string().min(1).max(200)).min(1).max(100),
    subjectId: z.string().min(1).max(256),
    anonymousId: z.string().min(1).max(256).optional(),
    sessionId: z.string().min(1).max(256).optional(),
    facts: z.record(z.string(), z.unknown()).default({}),
  })
  .strict();

export const FeatureFlagEvaluationSchema = z
  .object({
    key: z.string(),
    flagId: z.string().uuid(),
    version: z.number().int().positive(),
    variant: z.string(),
    value: FeatureFlagVariantValueSchema,
    reason: z.enum(["OFF", "DEFAULT", "RULE_MATCH", "ROLLOUT_EXCLUDED"]),
    ruleId: z.string().uuid().optional(),
  })
  .strict();

export const FeatureFlagEvaluationResponseSchema = z
  .object({
    evaluatedAt: z.string().datetime({ offset: true }),
    evaluations: z.array(FeatureFlagEvaluationSchema),
  })
  .strict();

function validateWeights(
  value: { variants: Array<{ key: string; weight: number }> },
  context: z.RefinementCtx,
): void {
  const keys = new Set<string>();
  let total = 0;
  for (const [index, variant] of value.variants.entries()) {
    if (keys.has(variant.key)) {
      context.addIssue({
        code: "custom",
        path: ["variants", index, "key"],
        message: "Variant keys must be unique",
      });
    }
    keys.add(variant.key);
    total += variant.weight;
  }
  if (total !== 10_000) {
    context.addIssue({
      code: "custom",
      path: ["variants"],
      message: "Variant weights must total 10000 basis points",
    });
  }
}

export type FeatureFlagDefinition = z.infer<
  typeof FeatureFlagDefinitionSchema
>;
export type FeatureFlagEvaluationRequest = z.infer<
  typeof FeatureFlagEvaluationRequestSchema
>;
export type FeatureFlagEvaluation = z.infer<
  typeof FeatureFlagEvaluationSchema
>;
export type FeatureFlagEvaluationResponse = z.infer<
  typeof FeatureFlagEvaluationResponseSchema
>;
