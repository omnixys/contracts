/**
 * Represents the standard GraphQL execution context used by resolvers.
 * Provides access to both the incoming HTTP request and outgoing response.
 */

import type {
  KeycloakRawOutput,
  KeycloakTokenPayload,
  Locale,
  TraceContextDTO,
} from '@omnixys/contracts-ts';

/**
 * Express request type containing Keycloak cookies.
 */
export interface OmnixysCookieRequest {
  access_token?: string;
  refresh_token?: string;
  locale: Locale;
}

export interface GqlCtx {
  req: Request & {
    cookies?: OmnixysCookieRequest;
    user?: KeycloakTokenPayload;
  };
  res: Response;
}

/** @deprecated Use ClientMetadata from `@omnixys/context-ts`. */
export interface ClientContext {
  ip: string | undefined;
  userAgent: string | undefined;
  device: string;
  browser: string;
  os: string;
  location: string;
  locale: Locale;
}

/** @deprecated Use PrincipalContext from `@omnixys/context-ts`. */
export interface ActorContext {
  actorId?: string;
  roles?: string[];
}

/** @deprecated Use TenantContext from `@omnixys/context-ts`. */
export interface TenantContext {
  tenantId?: string;
}

/** @deprecated Use ContextSnapshot from `@omnixys/context-ts`. */
export interface RequestContext {
  requestId?: string;
  correlationId?: string;
  ip?: string;
  locale?: string;
  userAgent?: string;
}

export interface RuntimeContext {
  service?: string;
  operation?: string;
  version?: string;
}

/** @deprecated Use ContextSnapshot from `@omnixys/context-ts`. */
export interface UnifiedContext {
  trace?: TraceContextDTO;
  actor?: ActorContext;
  tenant?: TenantContext;
  request?: RequestContext;
  runtime?: RuntimeContext;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;

  roles: string[];

  raw: KeycloakRawOutput;

  sub: string;
  preferred_username: string;
  given_name: string;
  family_name: string;

  tenantId: string;

  realm_access: {
    roles: string[];
  };

  access_token: string;
  refresh_token: string;
}
