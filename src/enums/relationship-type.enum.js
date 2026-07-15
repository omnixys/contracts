/**
 * Defines the relationship type between two users.
 * Mirrors the Prisma enum `RelationshipType`.
 */
export var RelationshipType;
(function (RelationshipType) {
    RelationshipType["FAMILY"] = "FAMILY";
    RelationshipType["FRIEND"] = "FRIEND";
    RelationshipType["PARTNER"] = "PARTNER";
    RelationshipType["COLLEAGUE"] = "COLLEAGUE";
    RelationshipType["OTHER"] = "OTHER";
    RelationshipType["BUSINESS_PARTNER"] = "BUSINESS_PARTNER";
    RelationshipType["RELATIVE"] = "RELATIVE";
    RelationshipType["PARENT"] = "PARENT";
    RelationshipType["SIBLING"] = "SIBLING";
    RelationshipType["CHILD"] = "CHILD";
    RelationshipType["COUSIN"] = "COUSIN";
})(RelationshipType || (RelationshipType = {}));
