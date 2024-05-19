'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Signer = require('./Signer.cjs');
var Transaction = require('./Transaction.cjs');
var SdkError = require('./errors/SdkError.cjs');

/**
 * Defines an generic object with wrapped instructions,
 * such as a {@link TransactionBuilder}.
 * @category Transactions
 */

/**
 * A builder that helps construct transactions.
 * @category Transactions
 */
class TransactionBuilder {
  constructor(items = [], options = {}) {
    this.items = items;
    this.options = options;
  }
  empty() {
    return new TransactionBuilder([], this.options);
  }
  setItems(input) {
    return new TransactionBuilder(this.parseItems(input), this.options);
  }
  prepend(input) {
    return new TransactionBuilder([...this.parseItems(input), ...this.items], this.options);
  }
  append(input) {
    return new TransactionBuilder([...this.items, ...this.parseItems(input)], this.options);
  }
  add(input) {
    return this.append(input);
  }
  mapInstructions(fn) {
    return new TransactionBuilder(this.items.map(fn), this.options);
  }
  addRemainingAccounts(accountMeta, instructionIndex) {
    instructionIndex = instructionIndex ?? this.items.length - 1;
    const metas = Array.isArray(accountMeta) ? accountMeta : [accountMeta];
    const extraKeys = metas.map(meta => 'pubkey' in meta ? meta : {
      pubkey: meta.signer.publicKey,
      isSigner: true,
      isWritable: meta.isWritable
    });
    const extraSigners = metas.flatMap(meta => 'pubkey' in meta ? [] : [meta.signer]);
    return this.mapInstructions((wrappedInstruction, index) => {
      if (index !== instructionIndex) return wrappedInstruction;
      const keys = [...wrappedInstruction.instruction.keys, ...extraKeys];
      return {
        ...wrappedInstruction,
        instruction: {
          ...wrappedInstruction.instruction,
          keys
        },
        signers: [...wrappedInstruction.signers, ...extraSigners]
      };
    });
  }
  splitByIndex(index) {
    return [new TransactionBuilder(this.items.slice(0, index), this.options), new TransactionBuilder(this.items.slice(index), this.options)];
  }

  /**
   * Split the builder into multiple builders, such that
   * each of them should fit in a single transaction.
   *
   * This method is unsafe for several reasons:
   * - Because transactions are atomic, splitting the builder
   *   into multiple transactions may cause undesired side effects.
   *   For example, if the first transaction succeeds but the second
   *   one fails, you may end up with an inconsistent account state.
   *   This is why it is recommended to manually split your transactions
   *   such that each of them is valid on its own.
   * - It can only split the instructions of the builder. Meaning that,
   *   if the builder has a single instruction that is too big to fit in
   *   a single transaction, it will not be able to split it.
   */
  unsafeSplitByTransactionSize(context) {
    return this.items.reduce((builders, item) => {
      const lastBuilder = builders.pop();
      const lastBuilderWithItem = lastBuilder.add(item);
      if (lastBuilderWithItem.fitsInOneTransaction(context)) {
        builders.push(lastBuilderWithItem);
      } else {
        builders.push(lastBuilder);
        builders.push(lastBuilder.empty().add(item));
      }
      return builders;
    }, [this.empty()]);
  }
  setFeePayer(feePayer) {
    return new TransactionBuilder(this.items, {
      ...this.options,
      feePayer
    });
  }
  getFeePayer(context) {
    return this.options.feePayer ?? context.payer;
  }
  setVersion(version) {
    return new TransactionBuilder(this.items, {
      ...this.options,
      version
    });
  }
  useLegacyVersion() {
    return this.setVersion('legacy');
  }
  useV0() {
    return this.setVersion(0);
  }
  setAddressLookupTables(addressLookupTables) {
    return new TransactionBuilder(this.items, {
      ...this.options,
      addressLookupTables
    });
  }
  getBlockhash() {
    return typeof this.options.blockhash === 'object' ? this.options.blockhash.blockhash : this.options.blockhash;
  }
  setBlockhash(blockhash) {
    return new TransactionBuilder(this.items, {
      ...this.options,
      blockhash
    });
  }
  async setLatestBlockhash(context, options = {}) {
    return this.setBlockhash(await context.rpc.getLatestBlockhash(options));
  }
  getInstructions() {
    return this.items.map(item => item.instruction);
  }
  getSigners(context) {
    return Signer.uniqueSigners([this.getFeePayer(context), ...this.items.flatMap(item => item.signers)]);
  }
  getBytesCreatedOnChain() {
    return this.items.reduce((sum, item) => sum + item.bytesCreatedOnChain, 0);
  }
  async getRentCreatedOnChain(context) {
    return context.rpc.getRent(this.getBytesCreatedOnChain(), {
      includesHeaderBytes: true
    });
  }
  getTransactionSize(context) {
    return context.transactions.serialize(this.setBlockhash('11111111111111111111111111111111').build(context)).length;
  }
  minimumTransactionsRequired(context) {
    return Math.ceil(this.getTransactionSize(context) / Transaction.TRANSACTION_SIZE_LIMIT);
  }
  fitsInOneTransaction(context) {
    return this.minimumTransactionsRequired(context) === 1;
  }
  build(context) {
    const blockhash = this.getBlockhash();
    if (!blockhash) {
      throw new SdkError.SdkError('Setting a blockhash is required to build a transaction. ' + 'Please use the `setBlockhash` or `setLatestBlockhash` methods.');
    }
    const input = {
      version: this.options.version ?? 0,
      payer: this.getFeePayer(context).publicKey,
      instructions: this.getInstructions(),
      blockhash
    };
    if (input.version === 0 && this.options.addressLookupTables) {
      input.addressLookupTables = this.options.addressLookupTables;
    }
    return context.transactions.create(input);
  }
  async buildWithLatestBlockhash(context, options = {}) {
    let builder = this;
    if (!this.options.blockhash) {
      builder = await this.setLatestBlockhash(context, options);
    }
    return builder.build(context);
  }
  async buildAndSign(context) {
    return Signer.signTransaction(await this.buildWithLatestBlockhash(context), this.getSigners(context));
  }
  async send(context, options = {}) {
    const transaction = await this.buildAndSign(context);
    return context.rpc.sendTransaction(transaction, options);
  }
  async confirm(context, signature, options = {}) {
    let builder = this;
    if (!this.options.blockhash) {
      builder = await this.setLatestBlockhash(context);
    }
    let strategy;
    if (options.strategy) {
      strategy = options.strategy;
    } else {
      const blockhash = typeof builder.options.blockhash === 'object' ? builder.options.blockhash : await context.rpc.getLatestBlockhash();
      strategy = options.strategy ?? {
        type: 'blockhash',
        ...blockhash
      };
    }
    return context.rpc.confirmTransaction(signature, {
      ...options,
      strategy
    });
  }
  async sendAndConfirm(context, options = {}) {
    let builder = this;
    if (!this.options.blockhash) {
      builder = await this.setLatestBlockhash(context);
    }
    const signature = await builder.send(context, options.send);
    const result = await builder.confirm(context, signature, options.confirm);
    return {
      signature,
      result
    };
  }
  parseItems(input) {
    return (Array.isArray(input) ? input : [input]).flatMap(item => 'items' in item ? item.items : [item]);
  }
}

/**
 * Creates a new transaction builder.
 * @category Transactions
 */
const transactionBuilder = (items = []) => new TransactionBuilder(items);

exports.TransactionBuilder = TransactionBuilder;
exports.transactionBuilder = transactionBuilder;
//# sourceMappingURL=TransactionBuilder.cjs.map
