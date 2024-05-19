import { publicKey } from '@metaplex-foundation/umi-public-keys';
import { base58, base10, base64 } from '@metaplex-foundation/umi-serializers';
import { SdkError } from './errors/SdkError.mjs';

/**
 * Builder for `getProgramAccounts` RPC requests.
 * @category Utils — GpaBuilder
 */
class GpaBuilder {
  constructor(context, programId, options = {}) {
    this.context = context;
    this.programId = programId;
    this.options = options;
  }
  reset() {
    return new GpaBuilder(this.context, this.programId, {
      fields: this.options.fields,
      deserializeCallback: this.options.deserializeCallback
    });
  }
  registerFields(fields) {
    return new GpaBuilder(this.context, this.programId, {
      ...this.options,
      fields
    });
  }
  registerFieldsFromStruct(structFields) {
    let offset = 0;
    const fields = structFields.reduce((acc, [field, serializer]) => {
      acc[field] = [offset, serializer];
      offset = offset === null || serializer.fixedSize === null ? null : offset + serializer.fixedSize;
      return acc;
    }, {});
    return this.registerFields(fields);
  }
  deserializeUsing(callback) {
    return new GpaBuilder(this.context, this.programId, {
      ...this.options,
      deserializeCallback: callback
    });
  }
  slice(offset, length) {
    return new GpaBuilder(this.context, this.programId, {
      ...this.options,
      dataSlice: {
        offset,
        length
      }
    });
  }
  sliceField(field, offset) {
    const [effectiveOffset, serializer] = this.getField(field, offset);
    if (!serializer.fixedSize) {
      throw new SdkError(`Cannot slice field [${field}] because its size is variable.`);
    }
    return this.slice(effectiveOffset, serializer.fixedSize);
  }
  withoutData() {
    return this.slice(0, 0);
  }
  addFilter(...filters) {
    return new GpaBuilder(this.context, this.programId, {
      ...this.options,
      filters: [...(this.options.filters ?? []), ...filters]
    });
  }
  where(offset, data) {
    let bytes;
    if (typeof data === 'string') {
      bytes = base58.serialize(data);
    } else if (typeof data === 'number' || typeof data === 'bigint' || typeof data === 'boolean') {
      bytes = base10.serialize(BigInt(data).toString());
    } else {
      bytes = new Uint8Array(data);
    }
    return this.addFilter({
      memcmp: {
        offset,
        bytes
      }
    });
  }
  whereField(field, data, offset) {
    const [effectiveOffset, serializer] = this.getField(field, offset);
    return this.where(effectiveOffset, serializer.serialize(data));
  }
  whereSize(dataSize) {
    return this.addFilter({
      dataSize
    });
  }
  sortUsing(callback) {
    return new GpaBuilder(this.context, this.programId, {
      ...this.options,
      sortCallback: callback
    });
  }
  async get(options = {}) {
    const accounts = await this.context.rpc.getProgramAccounts(this.programId, {
      ...options,
      dataSlice: options.dataSlice ?? this.options.dataSlice,
      filters: [...(options.filters ?? []), ...(this.options.filters ?? [])]
    });
    if (this.options.sortCallback) {
      accounts.sort(this.options.sortCallback);
    }
    return accounts;
  }
  async getAndMap(callback, options = {}) {
    return (await this.get(options)).map(callback);
  }
  async getDeserialized(options = {}) {
    const rpcAccounts = await this.get(options);
    if (!this.options.deserializeCallback) return rpcAccounts;
    return rpcAccounts.map(this.options.deserializeCallback);
  }
  async getPublicKeys(options = {}) {
    return this.getAndMap(account => account.publicKey, options);
  }
  async getDataAsPublicKeys(options = {}) {
    return this.getAndMap(account => {
      try {
        return publicKey(account.data);
      } catch (error) {
        const message = `Following a getProgramAccount call, you are trying to use an ` + `account's data (or a slice of it) as a public key. ` + `However, we encountered an account ` + `[${account.publicKey}] whose data ` + `[base64=${base64.deserialize(account.data)}] ` + `is not a valid public key.`;
        throw new SdkError(message);
      }
    }, options);
  }
  getField(fieldName, forcedOffset) {
    if (!this.options.fields) {
      throw new SdkError('Fields are not defined in this GpaBuilder.');
    }
    const field = this.options.fields[fieldName];
    if (!field) {
      throw new SdkError(`Field [${fieldName}] is not defined in this GpaBuilder.`);
    }
    const [offset, serializer] = field;
    if (forcedOffset !== undefined) {
      return [forcedOffset, serializer];
    }
    if (offset === null) {
      throw new SdkError(`Field [${fieldName}] does not have a fixed offset. ` + `This is likely because it is not in the fixed part of ` + `the account's data. In other words, it is located after ` + `a field of variable length which means we cannot find a ` + `fixed offset for the filter. You may go around this by ` + `providing an offset explicitly.`);
    }
    return [offset, serializer];
  }
}

/**
 * Creates a new {@link GpaBuilder} instance.
 * @category Utils — GpaBuilder
 */
const gpaBuilder = (context, programId) => new GpaBuilder(context, programId);

export { GpaBuilder, gpaBuilder };
//# sourceMappingURL=GpaBuilder.mjs.map
