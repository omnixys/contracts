/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Realm roles used by Omnixys services.
 * NOTE: Only ONE effective role is resolved.
 */
export var RealmRoleType;
(function (RealmRoleType) {
    RealmRoleType["ADMIN"] = "ADMIN";
    RealmRoleType["SUPREME"] = "SUPREME";
    RealmRoleType["ELITE"] = "ELITE";
    RealmRoleType["BASIC"] = "BASIC";
    RealmRoleType["USER"] = "USER";
    RealmRoleType["GUEST"] = "GUEST";
})(RealmRoleType || (RealmRoleType = {}));
/** Enum → Keycloak role name */
export const ENUM_TO_KC = {
    [RealmRoleType.ADMIN]: "ADMIN",
    [RealmRoleType.SUPREME]: "SUPREME",
    [RealmRoleType.ELITE]: "ELITE",
    [RealmRoleType.BASIC]: "BASIC",
    [RealmRoleType.USER]: "USER",
    [RealmRoleType.GUEST]: "GUEST",
};
/** Keycloak role string → enum */
export const KC_TO_ENUM = {
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
export function roleStrToEnum(s) {
    if (!s)
        return null;
    const raw = String(s).trim();
    const normalized = raw
        .replace(/^ROLE_/i, "")
        .replace(/^REALM:/i, "")
        .replace(/^CLIENT:/i, "")
        .trim();
    const lastSegment = normalized.includes(":")
        ? normalized.split(":").pop().trim()
        : normalized;
    return (KC_TO_ENUM[lastSegment] ?? KC_TO_ENUM[lastSegment.toLowerCase()] ?? null);
}
/** Convert string list → enum list */
export function toEnumRoles(list) {
    const out = [];
    const seen = new Set();
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
export function enumToKcName(r) {
    return ENUM_TO_KC[r] ?? String(r);
}
/**
 * Resolve ONE effective role.
 */
export function resolveEffectiveRole(isAuthenticated, raw) {
    if (!isAuthenticated) {
        return RealmRoleType.GUEST;
    }
    const roles = toEnumRoles(raw ?? []);
    const PRIORITY = [
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
