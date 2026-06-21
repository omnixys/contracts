# `@omnixys/shared` compatibility migration

DTOs, enums, runtime schemas, and transport-neutral domain errors are now owned
by `@omnixys/contracts`. Existing root imports from `@omnixys/shared` remain
operational through compatibility re-exports.

New code should import contracts directly:

```ts
import {
  createPendingUserSchema,
  type CreatePendingUserDTO,
} from '@omnixys/contracts';
```

Pure utilities remain in `@omnixys/shared`. Legacy request-context interfaces
remain deprecated compatibility types; use `@omnixys/context` for runtime
request, actor, tenant, correlation, and trace metadata.
