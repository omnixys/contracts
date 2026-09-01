/**
 * Token claim name that carries the internal Omnixys USER id (UUIDv7, U).
 *
 * Claim semantics (final):
 *   sub                = Keycloak subject  (K)
 *   omnixys_user_id    = internal User id  (U)   — only on USER tokens
 *   omnixys_service_id = internal Service/Agent principal id (S) — future SERVICE tokens
 */
export const OMNIXYS_USER_ID_CLAIM = "omnixys_user_id";

/**
 * Token claim name that will carry the internal Omnixys SERVICE principal id (UUIDv7, S).
 *
 * Not yet emitted: SERVICE tokens currently rely on the transitional compatibility
 * path (`userId = null`, `actorId = subject`) until a dedicated Service-Principal
 * domain is introduced in a later phase. Keep this constant as the planned name so
 * the token, resolver and validator stay aligned.
 */
export const OMNIXYS_SERVICE_ID_CLAIM = "omnixys_service_id";

/**
 * Keycloak user attribute that stores the internal Omnixys USER id (U).
 *
 * This is a projection for token issuance only — AuthUser.id is the source of truth.
 * Keycloak must never generate U itself.
 */
export const OMNIXYS_UID_KEYCLOAK_ATTRIBUTE = "omnixys_uid";