/**
 * Represents the lifecycle status of a user.
 * Mirrors the Prisma enum `PersonStatus`.
 */
export var PersonStatusType;
(function (PersonStatusType) {
    PersonStatusType["ACTIVE"] = "ACTIVE";
    PersonStatusType["DISABLED"] = "DISABLED";
    PersonStatusType["DELETED"] = "DELETED";
    PersonStatusType["INACTIVE"] = "INACTIVE";
    PersonStatusType["BLOCKED"] = "BLOCKED";
    PersonStatusType["CLOSED"] = "CLOSED";
})(PersonStatusType || (PersonStatusType = {}));
