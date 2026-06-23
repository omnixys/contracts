/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Realm roles used by Omnixys services.
 * NOTE: Only ONE effective role is resolved.
 */
export enum RealmRoleType {
  ADMIN = "ADMIN",
  SUPREME = "SUPREME",
  ELITE = "ELITE",
  BASIC = "BASIC",
  USER = "USER",
  GUEST = "GUEST",
}
export interface RoleData {
  id: string;
  name: string;
}
/** Enum → Keycloak role name */
export const ENUM_TO_KC: Record<RealmRoleType, string> = {
  [RealmRoleType.ADMIN]: "ADMIN",
  [RealmRoleType.SUPREME]: "SUPREME",
  [RealmRoleType.ELITE]: "ELITE",
  [RealmRoleType.BASIC]: "BASIC",
  [RealmRoleType.USER]: "USER",
  [RealmRoleType.GUEST]: "GUEST",
};
/** Keycloak role string → enum */
export const KC_TO_ENUM: Record<string, RealmRoleType> = {
  admin: RealmRoleType.ADMIN,
  ADMIN: RealmRoleType.ADMIN,
  supreme: RealmRoleType.SUPREME,
  SUPREME: RealmRoleType.SUPREME,
  elite: RealmRoleType.ELITE,
  ELITE: RealmRoleType.ELITE,
  basic: RealmRoleType.BASIC,
  BASIC: RealmRoleType.BASIC,
  user: RealmRoleType.USER,
  USER: RealmRoleType.USER,
  guest: RealmRoleType.GUEST,
  GUEST: RealmRoleType.GUEST,
};
/** Convert single string → enum */
export function roleStrToEnum(
  s: string | undefined | null,
): RealmRoleType | null {
  if (!s) return null;
  const raw = String(s).trim();
  const normalized = raw
    .replace(/^ROLE_/i, "")
    .replace(/^REALM:/i, "")
    .replace(/^CLIENT:/i, "")
    .trim();
  const lastSegment = normalized.includes(":")
    ? normalized.split(":").pop()!.trim()
    : normalized;
  return (
    KC_TO_ENUM[lastSegment] ?? KC_TO_ENUM[lastSegment.toLowerCase()] ?? null
  );
}
/** Convert string list → enum list */
export function toEnumRoles(
  list: Array<string | null | undefined>,
): RealmRoleType[] {
  const out: RealmRoleType[] = [];
  const seen = new Set<RealmRoleType>();
  for (const raw of list) {
    const r = roleStrToEnum(raw ?? undefined);
    if (r && !seen.has(r)) {
      seen.add(r);
      out.push(r);
    }
  }
  return out;
}
/** Enum → Keycloak role string */
export function enumToKcName(r: RealmRoleType): string {
  return ENUM_TO_KC[r] ?? String(r);
}
/**
 * Resolve ONE effective role.
 */
export function resolveEffectiveRole(
  isAuthenticated: boolean,
  raw?: string[] | null,
): RealmRoleType {
  if (!isAuthenticated) {
    return RealmRoleType.GUEST;
  }
  const roles = toEnumRoles(raw ?? []);
  const PRIORITY: RealmRoleType[] = [
    RealmRoleType.ADMIN,
    RealmRoleType.SUPREME,
    RealmRoleType.ELITE,
    RealmRoleType.BASIC,
    RealmRoleType.USER,
    RealmRoleType.GUEST,
  ];
  for (const p of PRIORITY) {
    if (roles.includes(p)) {
      return p;
    }
  }
  return RealmRoleType.GUEST;
}
