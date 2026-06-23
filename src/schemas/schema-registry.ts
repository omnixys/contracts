import type { z } from "zod";

export class SharedSchemaNotFoundError extends Error {
  readonly code = "CONTRACT_SCHEMA_NOT_FOUND";

  constructor(
    readonly contract: string,
    readonly version: string,
  ) {
    super(`No schema registered for ${contract}@${version}`);
    this.name = SharedSchemaNotFoundError.name;
  }
}

export class SharedSchemaRegistry {
  private readonly schemas = new Map<string, z.ZodType>();

  register<T extends z.ZodType>(
    contract: string,
    version: string,
    schema: T,
  ): this {
    const key = schemaKey(contract, version);
    const existing = this.schemas.get(key);
    if (existing && existing !== schema) {
      throw new Error(`Shared schema ${key} is already registered`);
    }
    this.schemas.set(key, schema);
    return this;
  }

  parse<T>(contract: string, version: string, value: unknown): T {
    const schema = this.schemas.get(schemaKey(contract, version));
    if (!schema) throw new SharedSchemaNotFoundError(contract, version);
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
  const normalizedShared = contract.trim();
  if (!normalizedShared) throw new TypeError("Shared name is required");
  if (!/^\d+\.\d+$/.test(version)) {
    throw new TypeError("Shared schema version must use major.minor format");
  }
  return `${normalizedShared}@${version}`;
}
