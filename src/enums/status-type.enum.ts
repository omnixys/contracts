/**
 * Represents a generic business status.
 * Mirrors the Prisma enum `StatusType`.
 */
export enum StatusType {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
  CLOSED = "CLOSED",
}
