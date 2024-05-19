import { numberFactory } from './utils.mjs';

const u64 = (options = {}) => numberFactory({
  name: 'u64',
  size: 8,
  range: [0, BigInt('0xffffffffffffffff')],
  set: (view, value, le) => view.setBigUint64(0, BigInt(value), le),
  get: (view, le) => view.getBigUint64(0, le),
  options
});

export { u64 };
//# sourceMappingURL=u64.mjs.map
