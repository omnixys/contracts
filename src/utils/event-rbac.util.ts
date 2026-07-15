import { EventPermissionKey, EVENT_PERMISSION_KEYS } from '../enums/event-permission-key.enum.js';
import { EventRoleType } from '../enums/event-role-type.enum.js';

export const EventSystemRoleKey = {
  Admin: 'ADMIN',
  Security: 'SECURITY',
  Guest: 'GUEST',
} as const;

export type EventSystemRoleKey =
  (typeof EventSystemRoleKey)[keyof typeof EventSystemRoleKey];

const STAFF_VIEW_PERMISSIONS = [
  EventPermissionKey.ViewEvent,
  EventPermissionKey.ViewGuests,
  EventPermissionKey.ViewTickets,
  EventPermissionKey.ViewSeats,
  EventPermissionKey.ViewTimeline,
] as const;

const SECURITY_PERMISSIONS = [
  ...STAFF_VIEW_PERMISSIONS,
  EventPermissionKey.ScanTickets,
] as const;

const GUEST_PERMISSIONS = [
  EventPermissionKey.ViewEvent,
  EventPermissionKey.ViewSelfTicket,
  EventPermissionKey.ViewSelfSeat,
  EventPermissionKey.ManageSelfPlusOnes,
  EventPermissionKey.ViewTimeline,
] as const;

const SUPPORT_PERMISSIONS = [
  EventPermissionKey.ViewEvent,
  EventPermissionKey.ViewSupport,
  EventPermissionKey.RespondSupport,
  EventPermissionKey.ViewNotifications,
] as const;

export function getDefaultPermissionsForEventRole(
  role: EventRoleType | string | null | undefined,
): EventPermissionKey[] {
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

export function getDefaultPermissionsForSystemRole(
  role: EventSystemRoleKey,
): EventPermissionKey[] {
  return getDefaultPermissionsForEventRole(role);
}

export function uniqueEventPermissions(
  permissions: Iterable<string>,
): EventPermissionKey[] {
  const valid = new Set<string>(EVENT_PERMISSION_KEYS);
  return [...new Set(permissions)].filter((permission): permission is EventPermissionKey =>
    valid.has(permission),
  );
}

export function hasEveryEventPermission(
  actual: Iterable<string>,
  required: readonly string[],
): boolean {
  const actualSet = new Set(actual);
  return required.every((permission) => actualSet.has(permission));
}
