# Public error contract v1

The canonical machine-readable catalog is exported by `@omnixys/contracts-ts` as
`ERROR_DEFINITIONS`; its version is `ERROR_CATALOG_VERSION` (`1.0.0`). Every
entry contains `code`, `summary`, `defaultMessage`, `httpStatus`, `retryable`
and `publicMetadataKeys`.

GraphQL execution errors keep HTTP 200 and expose only:

```json
{
  "message": "The supplied credentials are invalid.",
  "extensions": {
    "code": "INVALID_CREDENTIALS",
    "summary": "Authentication failed.",
    "httpStatus": 401,
    "retryable": false,
    "service": "authentication",
    "operation": "login",
    "requestId": "req_...",
    "correlationId": "corr_...",
    "traceId": "trace_...",
    "timestamp": "2026-07-29T13:58:12.000Z",
    "metadata": {}
  }
}
```

REST uses the same fields at the top level and additionally exposes
`statusCode`. Transport errors use their real HTTP status. The frontend must
branch on `code`, never on `message`. Metadata is denied by default and only
keys listed in `publicMetadataKeys` are emitted.

`diagnostics`, `cause`, stack traces, callsites, actor/tenant identifiers,
dependency responses, headers and credentials are server-only.

## Diagnostics

`ExceptionReporter` emits the single canonical error log at the outer request,
consumer or job boundary. The related span may record the same exception.
Inner adapters attach a sanitized `cause` and `diagnostics` and rethrow.

Useful Loki queries:

```logql
{service="authentication"} | json | requestId="req_..."
{service="authentication"} | json | correlationId="corr_..."
{service="authentication"} | json | traceId="trace_..."
{service="authentication"} | json | operation="login" | code="INVALID_CREDENTIALS"
```

The `traceId` field is the link to the corresponding Tempo trace. Secrets are
recursively redacted before Pino, batch/file and OTLP outputs.
