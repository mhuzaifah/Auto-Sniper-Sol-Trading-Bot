'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Signer = require('./Signer.cjs');
var TransactionBuilder = require('./TransactionBuilder.cjs');
var arrays = require('./utils/arrays.cjs');

class TransactionBuilderGroup {
  constructor(builders = [], options = {}) {
    this.builders = builders;
    this.options = options;
  }
  prepend(builder) {
    const newBuilders = Array.isArray(builder) ? builder : [builder];
    return new TransactionBuilderGroup([...newBuilders, ...this.builders], this.options);
  }
  append(builder) {
    const newBuilders = Array.isArray(builder) ? builder : [builder];
    return new TransactionBuilderGroup([...this.builders, ...newBuilders], this.options);
  }
  add(builder) {
    return this.append(builder);
  }
  sequential() {
    return new TransactionBuilderGroup(this.builders, {
      ...this.options,
      parallel: false
    });
  }
  parallel() {
    return new TransactionBuilderGroup(this.builders, {
      ...this.options,
      parallel: true
    });
  }
  isParallel() {
    return this.options.parallel ?? false;
  }
  merge() {
    if (this.builders.length === 0) {
      return new TransactionBuilder.TransactionBuilder();
    }
    return this.builders.reduce((builder, next) => builder.add(next), this.builders[0].empty());
  }
  build(context) {
    return this.builders.map(builder => builder.build(context));
  }
  async setLatestBlockhash(context) {
    const hasBlockhashlessBuilder = this.builders.some(builder => !builder.options.blockhash);
    if (!hasBlockhashlessBuilder) return this;
    const blockhash = await context.rpc.getLatestBlockhash();
    return this.map(builder => builder.options.blockhash ? builder : builder.setBlockhash(blockhash));
  }
  async buildWithLatestBlockhash(context) {
    return (await this.setLatestBlockhash(context)).build(context);
  }
  async buildAndSign(context) {
    const transactions = await this.buildWithLatestBlockhash(context);
    const signers = this.builders.map(builder => builder.getSigners(context));
    return Signer.signAllTransactions(arrays.zipMap(transactions, signers, (transaction, txSigners) => ({
      transaction,
      signers: txSigners ?? []
    })));
  }
  async send(context, options = {}) {
    return this.runAll(await this.buildAndSign(context), async tx => context.rpc.sendTransaction(tx, options));
  }
  async sendAndConfirm(context, options = {}) {
    const blockhashWithExpiryBlockHeight = this.builders.find(builder => typeof builder.options.blockhash === 'object')?.options.blockhash;
    let strategy;
    if (options.confirm?.strategy) {
      strategy = options.confirm.strategy;
    } else {
      const blockhash = blockhashWithExpiryBlockHeight ?? (await context.rpc.getLatestBlockhash());
      strategy = options.confirm?.strategy ?? {
        type: 'blockhash',
        ...blockhash
      };
    }
    return this.runAll(await this.buildAndSign(context), async tx => {
      const signature = await context.rpc.sendTransaction(tx, options.send);
      const result = await context.rpc.confirmTransaction(signature, {
        ...options.confirm,
        strategy
      });
      return {
        signature,
        result
      };
    });
  }
  map(fn) {
    return new TransactionBuilderGroup(this.builders.map(fn));
  }
  filter(fn) {
    return new TransactionBuilderGroup(this.builders.filter(fn));
  }
  async runAll(array, fn) {
    if (this.isParallel()) {
      return Promise.all(array.map(fn));
    }
    return array.reduce(async (promise, ...args) => [...(await promise), await fn(...args)], Promise.resolve([]));
  }
}
function transactionBuilderGroup(builders = []) {
  return new TransactionBuilderGroup(builders);
}

exports.TransactionBuilderGroup = TransactionBuilderGroup;
exports.transactionBuilderGroup = transactionBuilderGroup;
//# sourceMappingURL=TransactionBuilderGroup.cjs.map
