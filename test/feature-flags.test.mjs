import assert from "node:assert/strict";
import test from "node:test";
import {
  FeatureFlagDefinitionSchema,
  FeatureFlagEvaluationRequestSchema,
} from "../dist/analytics/index.js";

test("accepts versioned feature flag definitions with basis point weights", () => {
  const definition = FeatureFlagDefinitionSchema.parse({
    definitionVersion: "1.0",
    revision: 1,
    enabled: true,
    defaultVariant: "control",
    offVariant: "control",
    variants: [
      { key: "control", value: false, weight: 5_000 },
      { key: "treatment", value: true, weight: 5_000 },
    ],
    rules: [],
  });

  assert.equal(definition.variants.length, 2);
});

test("rejects invalid weights and bounds evaluation batches", () => {
  assert.equal(
    FeatureFlagDefinitionSchema.safeParse({
      definitionVersion: "1.0",
      revision: 1,
      enabled: true,
      defaultVariant: "on",
      offVariant: "off",
      variants: [{ key: "on", value: true, weight: 9_999 }],
      rules: [],
    }).success,
    false,
  );
  assert.equal(
    FeatureFlagEvaluationRequestSchema.safeParse({
      keys: [],
      subjectId: "user-1",
      facts: {},
    }).success,
    false,
  );
});
