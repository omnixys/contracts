export declare const EventPermissionKey: {
    readonly ViewEvent: "event.view";
    readonly EditEvent: "event.edit";
    readonly DeleteEvent: "event.delete";
    readonly ViewGuests: "guests.view";
    readonly ManageGuests: "guests.manage";
    readonly ApproveGuests: "guests.approve";
    readonly ExportGuests: "guests.export";
    readonly ViewInvitations: "invitations.view";
    readonly ManageInvitations: "invitations.manage";
    readonly ViewSeats: "seats.view";
    readonly ManageSeats: "seats.manage";
    readonly ViewTickets: "tickets.view";
    readonly ManageTickets: "tickets.manage";
    readonly ScanTickets: "tickets.scan";
    readonly ManagePlusOnes: "plus_ones.manage";
    readonly ViewAnalytics: "analytics.view";
    readonly ViewSupport: "support.view";
    readonly ManageSupport: "support.manage";
    readonly RespondSupport: "support.respond";
    readonly ViewNotifications: "notifications.view";
    readonly SendNotifications: "notifications.send";
    readonly ViewTimeline: "timeline.view";
    readonly ManageTimeline: "timeline.manage";
    readonly ViewEventSettings: "settings.view";
    readonly ManageEventSettings: "settings.manage";
    readonly ViewRoles: "roles.view";
    readonly ManageRoles: "roles.manage";
    readonly ViewStaff: "staff.view";
    readonly ManageStaff: "staff.manage";
    readonly ViewMedia: "media.view";
    readonly ManageMedia: "media.manage";
    readonly ExportData: "data.export";
    readonly ViewAuditLog: "audit.view";
};
export type EventPermissionKey = (typeof EventPermissionKey)[keyof typeof EventPermissionKey];
export declare const EVENT_PERMISSION_KEYS: ("event.view" | "event.edit" | "event.delete" | "guests.view" | "guests.manage" | "guests.approve" | "guests.export" | "invitations.view" | "invitations.manage" | "seats.view" | "seats.manage" | "tickets.view" | "tickets.manage" | "tickets.scan" | "plus_ones.manage" | "analytics.view" | "support.view" | "support.manage" | "support.respond" | "notifications.view" | "notifications.send" | "timeline.view" | "timeline.manage" | "settings.view" | "settings.manage" | "roles.view" | "roles.manage" | "staff.view" | "staff.manage" | "media.view" | "media.manage" | "data.export" | "audit.view")[];
export type EventPermissionCategory = 'event' | 'guests' | 'invitations' | 'seats' | 'tickets' | 'plus_ones' | 'analytics' | 'support' | 'notifications' | 'timeline' | 'settings' | 'roles' | 'staff' | 'media' | 'data' | 'audit';
export interface EventPermissionDefinition {
    key: EventPermissionKey;
    category: EventPermissionCategory;
    label: string;
    description: string;
    premiumFeatureKey?: string;
}
export declare const EVENT_PERMISSION_DEFINITIONS: readonly EventPermissionDefinition[];
//# sourceMappingURL=event-permission-key.enum.d.ts.map