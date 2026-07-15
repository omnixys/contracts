/**
 * Realm roles used by Omnixys services.
 * NOTE: Only ONE effective role is resolved.
 */
export declare enum RealmRoleType {
    ADMIN = "ADMIN",
    SUPREME = "SUPREME",
    ELITE = "ELITE",
    BASIC = "BASIC",
    USER = "USER",
    GUEST = "GUEST"
}
export interface RoleData {
    id: string;
    name: string;
}
/** Enum → Keycloak role name */
export declare const ENUM_TO_KC: Record<RealmRoleType, string>;
/** Keycloak role string → enum */
export declare const KC_TO_ENUM: Record<string, RealmRoleType>;
/** Convert single string → enum */
export declare function roleStrToEnum(s: string | undefined | null): RealmRoleType | null;
/** Convert string list → enum list */
export declare function toEnumRoles(list: Array<string | null | undefined>): RealmRoleType[];
/** Enum → Keycloak role string */
export declare function enumToKcName(r: RealmRoleType): string;
/**
 * Resolve ONE effective role.
 */
export declare function resolveEffectiveRole(isAuthenticated: boolean, raw?: string[] | null): RealmRoleType;
//# sourceMappingURL=role-type.enum.d.ts.map