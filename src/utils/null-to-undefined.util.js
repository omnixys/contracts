/**
 * Converts database null values into undefined.
 * This is useful when mapping Prisma results to GraphQL payloads,
 * since GraphQL treats undefined as "field not present" while null
 * means "explicitly null".
 *
 * @example
 * n2u(seat.label)  // label | undefined
 */
export function n2u(value) {
    return value ?? undefined;
}
