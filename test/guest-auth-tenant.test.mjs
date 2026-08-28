import assert from "node:assert/strict";
import test from "node:test";

import { guestAuthKeySchema } from "../dist/index.js";

const validPayload = {
  actorId: "00000000-0000-4000-8000-000000000001",
  tenantId: "00000000-0000-4000-8000-000000000002",
  invitees: [
    {
      invitationId: "00000000-0000-4000-8000-000000000003",
      firstName: "Ada",
      lastName: "Lovelace",
    },
  ],
  eventEndsAt: new Date("2030-01-01T12:00:00.000Z"),
};

test("guest auth payload requires a valid tenant UUID", () => {
  const parsed = guestAuthKeySchema.parse(validPayload);
  assert.equal(parsed.tenantId, validPayload.tenantId);

  assert.throws(() => {
    const { tenantId: _tenantId, ...missingTenant } = validPayload;
    guestAuthKeySchema.parse(missingTenant);
  });
  assert.throws(() =>
    guestAuthKeySchema.parse({
      ...validPayload,
      tenantId: "not-a-uuid",
    }),
  );
});
