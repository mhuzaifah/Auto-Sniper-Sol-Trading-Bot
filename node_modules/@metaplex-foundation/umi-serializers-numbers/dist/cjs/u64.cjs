'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const u64 = (options = {}) => utils.numberFactory({
  name: 'u64',
  size: 8,
  range: [0, BigInt('0xffffffffffffffff')],
  set: (view, value, le) => view.setBigUint64(0, BigInt(value), le),
  get: (view, le) => view.getBigUint64(0, le),
  options
});

exports.u64 = u64;
//# sourceMappingURL=u64.cjs.map
