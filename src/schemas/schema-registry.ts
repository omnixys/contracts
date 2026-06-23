import type { z } from "zod";

export class ContractSchemaNotFoundError extends Error {
  readonly code = "CONTRACT_SCHEMA_NOT_FOUND";

  constructor(
    readonly contract: string,
    readonly version: string,
  ) {
    super(`No schema registered for ${contract}@${version}`);
    this.name = ContractSchemaNotFoundError.name;
  }
}

export class ContractSchemaRegistry {
  private readonly schemas = new Map<string, z.ZodType>();

  register<T extends z.ZodType>(
    contract: string,
    version: string,
    schema: T,
  ): this {
    const key = schemaKey(contract, version);
    const existing = this.schemas.get(key);
    if (existing && existing !== schema) {
      throw new Error(`Contract schema ${key} is already registered`);
    }
    this.schemas.set(key, schema);
    return this;
  }

  parse<T>(contract: string, version: string, value: unknown): T {
    const schema = this.schemas.get(schemaKey(contract, version));
    if (!schema) throw new ContractSchemaNotFoundError(contract, version);
    return schema.parse(value) as T;
  }

  has(contract: string, version: string): boolean {
    return this.schemas.has(schemaKey(contract, version));
  }

  diagnostics() {
    return { schemas: [...this.schemas.keys()].sort() };
  }
}

function schemaKey(contract: string, version: string): string {
  const normalizedContracts = contract.trim();
  if (!normalizedContracts) throw new TypeError("Contracts name is required");
  if (!/^\d+\.\d+$/.test(version)) {
    throw new TypeError("Contracts schema version must use major.minor format");
  }
  return `${normalizedContracts}@${version}`;
}
