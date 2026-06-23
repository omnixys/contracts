# @omnixys/shared

Canonical, transport-neutral shared for Omnixys services.

This package owns DTOs, enums, runtime schemas, schema-version registration,
and domain errors. It does not own logging, request context, observability,
NestJS transport exceptions, or business services.

```ts
import {
  SharedSchemaRegistry,
  ErrorCode,
  createPendingUserSchema,
  UserNotFoundException,
} from "@omnixys/shared";

const pendingUser = createPendingUserSchema.parse(input);
const registry = new SharedSchemaRegistry().register(
  "user.pending",
  "1.0",
  createPendingUserSchema,
);

throw new UserNotFoundException(userId, {
  context: { requestId, correlationId, actorId, tenantId },
});

if (error.code === ErrorCode.USER_NOT_FOUND) {
  // Map the stable code; never branch on error.message.
}
```

Schemas use explicit `major.minor` versions. Breaking payload changes require a
new major schema version; additive compatible changes require a new minor.

## Error codes

`ErrorCode` is the canonical wire vocabulary for backend transports and clients.
Existing values are immutable. New failures are introduced additively, and
messages remain human-readable diagnostics rather than control-flow identifiers.
Transport packages map `FrameworkException.code` without changing it.
