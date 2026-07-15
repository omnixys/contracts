/**
 * Converts database null values into undefined.
 * This is useful when mapping Prisma results to GraphQL payloads,
 * since GraphQL treats undefined as "field not present" while null
 * means "explicitly null".
 *
 * @example
 * n2u(seat.label)  // label | undefined
 */
export declare function n2u<T>(value: T | null): T | undefined;
//# sourceMappingURL=null-to-undefined.util.d.ts.map