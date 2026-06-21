# @omnixys/shared

Compatibility facade and pure utility package for the Omnixys TypeScript
platform.

New services should import domain DTOs, enums, schemas, and transport-neutral
errors from `@omnixys/contracts`. Existing root imports from
`@omnixys/shared` remain operational and resolve to the same canonical
implementations.

## Ownership

`@omnixys/shared` owns:

- pure, infrastructure-independent utilities;
- deprecated request-context interfaces retained for source compatibility;
- deprecated NestJS exception wrappers retained for runtime compatibility.

`@omnixys/shared` does not own:

- domain DTOs, enums, schemas, or framework errors;
- request context or token handling;
- logging or observability;
- Kafka, GraphQL, persistence, or configuration infrastructure.

## New code

```ts
import {
  CreatePendingUserDTO,
  CreatePendingUserSchema,
  UserType,
} from '@omnixys/contracts';
```

Install the canonical package directly:

```bash
pnpm add @omnixys/contracts
```

## Existing code

The following remains compatible during the staged migration:

```ts
import { CreatePendingUserDTO, UserType } from '@omnixys/shared';
```

No public shared export was removed in this migration. See
[`MIGRATION.md`](./MIGRATION.md) for ownership and replacement guidance.

## Versioning

Both packages follow semantic versioning. Contract removals require a major
release and a coordinated consumer migration. Compatibility exports are
deprecated before removal.
