/**
 * Kind of verified principal resolved from a token.
 *
 * `USER`     → human user / guest: `userId` = internal UUIDv7 (U), `subject` = Keycloak sub (K).
 * `SERVICE`  → machine / service account / agent: `subject` = Keycloak service sub (K_service),
 *              `userId` = null (a service is NOT a user and never receives a fabricated U).
 */
export enum PrincipalType {
  USER = "USER",
  SERVICE = "SERVICE",
}