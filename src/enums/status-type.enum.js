/**
 * Represents a generic business status.
 * Mirrors the Prisma enum `StatusType`.
 */
export var StatusType;
(function (StatusType) {
    StatusType["ACTIVE"] = "ACTIVE";
    StatusType["INACTIVE"] = "INACTIVE";
    StatusType["BLOCKED"] = "BLOCKED";
    StatusType["PENDING"] = "PENDING";
    StatusType["SUSPENDED"] = "SUSPENDED";
    StatusType["CLOSED"] = "CLOSED";
})(StatusType || (StatusType = {}));
