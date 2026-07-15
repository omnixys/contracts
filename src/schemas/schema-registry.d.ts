import type { z } from "zod";
export declare class ContractSchemaNotFoundError extends Error {
    readonly contract: string;
    readonly version: string;
    readonly code = "CONTRACT_SCHEMA_NOT_FOUND";
    constructor(contract: string, version: string);
}
export declare class ContractSchemaRegistry {
    private readonly schemas;
    register<T extends z.ZodType>(contract: string, version: string, schema: T): this;
    parse<T>(contract: string, version: string, value: unknown): T;
    has(contract: string, version: string): boolean;
    diagnostics(): {
        schemas: string[];
    };
}
//# sourceMappingURL=schema-registry.d.ts.map