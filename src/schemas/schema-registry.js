export class ContractSchemaNotFoundError extends Error {
    contract;
    version;
    code = "CONTRACT_SCHEMA_NOT_FOUND";
    constructor(contract, version) {
        super(`No schema registered for ${contract}@${version}`);
        this.contract = contract;
        this.version = version;
        this.name = ContractSchemaNotFoundError.name;
    }
}
export class ContractSchemaRegistry {
    schemas = new Map();
    register(contract, version, schema) {
        const key = schemaKey(contract, version);
        const existing = this.schemas.get(key);
        if (existing && existing !== schema) {
            throw new Error(`Contract schema ${key} is already registered`);
        }
        this.schemas.set(key, schema);
        return this;
    }
    parse(contract, version, value) {
        const schema = this.schemas.get(schemaKey(contract, version));
        if (!schema)
            throw new ContractSchemaNotFoundError(contract, version);
        return schema.parse(value);
    }
    has(contract, version) {
        return this.schemas.has(schemaKey(contract, version));
    }
    diagnostics() {
        return { schemas: [...this.schemas.keys()].sort() };
    }
}
function schemaKey(contract, version) {
    const normalizedContracts = contract.trim();
    if (!normalizedContracts)
        throw new TypeError("Contracts name is required");
    if (!/^\d+\.\d+$/.test(version)) {
        throw new TypeError("Contracts schema version must use major.minor format");
    }
    return `${normalizedContracts}@${version}`;
}
