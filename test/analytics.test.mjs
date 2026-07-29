import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import {
  AnalyticsBatchRequestSchema,
  AnalyticsProcessingEventSchema,
  AnalyticsRuleSetSchema,
} from "../dist/analytics/index.js";

test("parses a valid analytics batch", () => {
  const parsed = AnalyticsBatchRequestSchema.parse({
    batchId: "ad4fd042-0365-44fd-8ac2-f3bccbe6701d",
    sentAt: "2026-07-29T10:00:00.000Z",
    events: [{
      eventId: "8133df74-e577-42f5-bc93-e8ac7f49814c",
      schemaVersion: "1.0",
      type: "track",
      name: "InvitationAccepted",
      userId: "user-1",
      occurredAt: "2026-07-29T10:00:00.000Z",
      properties: { invitationId: "invitation-1" },
      sdk: { name: "@omnixys/analytics-sdk", version: "1.0.0" },
    }],
  });
  assert.equal(parsed.events[0].name, "InvitationAccepted");
});

test("rejects unidentifiable analytics events", () => {
  assert.throws(() => AnalyticsBatchRequestSchema.parse({
    batchId: "ad4fd042-0365-44fd-8ac2-f3bccbe6701d",
    sentAt: "2026-07-29T10:00:00.000Z",
    events: [{
      eventId: "8133df74-e577-42f5-bc93-e8ac7f49814c",
      schemaVersion: "1.0",
      type: "track",
      name: "InvitationAccepted",
      occurredAt: "2026-07-29T10:00:00.000Z",
      sdk: { name: "@omnixys/analytics-sdk", version: "1.0.0" },
    }],
  }));
});

test("parses a nested rule AST", () => {
  const rule = AnalyticsRuleSetSchema.parse({
    id: "cbd30dcf-dacd-4b9c-a7e8-122b56c4ba36",
    version: 1,
    definitionVersion: "1.0",
    condition: { all: [
      { operator: "eq", left: { fact: "country" }, right: "DE" },
      { operator: "gte", left: { fact: "conversions" }, right: 10 },
    ] },
  });
  assert.equal(rule.version, 1);
});

test("parses replay metadata without changing the canonical event identity", () => {
  const eventId = randomUUID();
  const result = AnalyticsProcessingEventSchema.parse({
    organizationId: randomUUID(),
    workspaceId: randomUUID(),
    sourceId: randomUUID(),
    environment: "production",
    receivedAt: new Date().toISOString(),
    processingVersion: "analytics-service@1.0.0",
    replay: {
      jobId: randomUUID(),
      originalEventId: eventId,
      suppressSideEffects: true,
    },
    event: validEvent({ eventId }),
  });

  assert.equal(result.event.eventId, eventId);
  assert.equal(result.replay?.originalEventId, eventId);
});

function validEvent(overrides = {}) {
  return {
    eventId: randomUUID(),
    schemaVersion: "1.0",
    type: "track",
    name: "InvitationAccepted",
    userId: "user-1",
    occurredAt: new Date().toISOString(),
    properties: {},
    sdk: { name: "@omnixys/analytics-sdk", version: "1.0.0" },
    ...overrides,
  };
}
