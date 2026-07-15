import { EventPermissionKey, EVENT_PERMISSION_KEYS } from '../enums/event-permission-key.enum.js';
import { EventRoleType } from '../enums/event-role-type.enum.js';
export const EventSystemRoleKey = {
    Admin: 'ADMIN',
    Security: 'SECURITY',
    Guest: 'GUEST',
};
const STAFF_VIEW_PERMISSIONS = [
    EventPermissionKey.ViewEvent,
    EventPermissionKey.ViewGuests,
    EventPermissionKey.ViewTickets,
    EventPermissionKey.ViewSeats,
    EventPermissionKey.ViewTimeline,
];
const SECURITY_PERMISSIONS = [
    ...STAFF_VIEW_PERMISSIONS,
    EventPermissionKey.ScanTickets,
];
const GUEST_PERMISSIONS = [
    EventPermissionKey.ViewEvent,
    EventPermissionKey.ViewTickets,
    EventPermissionKey.ViewSeats,
    EventPermissionKey.ManagePlusOnes,
    EventPermissionKey.ViewTimeline,
];
const SUPPORT_PERMISSIONS = [
    EventPermissionKey.ViewEvent,
    EventPermissionKey.ViewSupport,
    EventPermissionKey.RespondSupport,
    EventPermissionKey.ViewNotifications,
];
export function getDefaultPermissionsForEventRole(role) {
    switch (role) {
        case EventRoleType.ADMIN:
            return [...EVENT_PERMISSION_KEYS];
        case EventRoleType.SECURITY:
            return [...SECURITY_PERMISSIONS];
        case EventRoleType.GUEST:
            return [...GUEST_PERMISSIONS];
        case EventRoleType.SUPPORT:
            return [...SUPPORT_PERMISSIONS];
        default:
            return [];
    }
}
export function getDefaultPermissionsForSystemRole(role) {
    return getDefaultPermissionsForEventRole(role);
}
export function uniqueEventPermissions(permissions) {
    const valid = new Set(EVENT_PERMISSION_KEYS);
    return [...new Set(permissions)].filter((permission) => valid.has(permission));
}
export function hasEveryEventPermission(actual, required) {
    const actualSet = new Set(actual);
    return required.every((permission) => actualSet.has(permission));
}
