import { EventPermissionKey } from '../enums/event-permission-key.enum.js';
import { EventRoleType } from '../enums/event-role-type.enum.js';
export declare const EventSystemRoleKey: {
    readonly Admin: "ADMIN";
    readonly Security: "SECURITY";
    readonly Guest: "GUEST";
};
export type EventSystemRoleKey = (typeof EventSystemRoleKey)[keyof typeof EventSystemRoleKey];
export declare function getDefaultPermissionsForEventRole(role: EventRoleType | string | null | undefined): EventPermissionKey[];
export declare function getDefaultPermissionsForSystemRole(role: EventSystemRoleKey): EventPermissionKey[];
export declare function uniqueEventPermissions(permissions: Iterable<string>): EventPermissionKey[];
export declare function hasEveryEventPermission(actual: Iterable<string>, required: readonly string[]): boolean;
//# sourceMappingURL=event-rbac.util.d.ts.map