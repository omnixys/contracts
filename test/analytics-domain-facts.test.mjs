import assert from "node:assert/strict";
import test from "node:test";
import {
  AnalyticsDomainFactSchema,
  AnalyticsProducerSchema,
} from "../dist/analytics/index.js";

test("accepts a typed business outcome fact", () => {
  const fact = AnalyticsDomainFactSchema.parse({
    producer: "ticket",
    eventName: "QrScanRejected",
    occurredAt: "2026-07-29T10:00:00.000Z",
    aggregateId: "scan-1",
    aggregateType: "scan",
    subjectId: "guest-1",
    properties: { eventId: "event-1", reason: "ALREADY_USED" },
  });
  assert.equal(fact.eventName, "QrScanRejected");
});

test("producer registry is closed and deterministic", () => {
  assert.equal(AnalyticsProducerSchema.safeParse("unknown-service").success, false);
});

test("rejects sensitive properties recursively", () => {
  const result = AnalyticsDomainFactSchema.safeParse({
    producer: "notification",
    eventName: "NotificationFailed",
    occurredAt: "2026-07-29T10:00:00.000Z",
    aggregateId: "delivery-1",
    aggregateType: "notification",
    properties: { channel: "EMAIL", nested: { message: "private" } },
  });
  assert.equal(result.success, false);
});
