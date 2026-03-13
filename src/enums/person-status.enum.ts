/**
 * Represents the lifecycle status of a user.
 * Mirrors the Prisma enum `PersonStatus`.
 */
export enum PersonStatusType {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  CLOSED = 'CLOSED',
}
