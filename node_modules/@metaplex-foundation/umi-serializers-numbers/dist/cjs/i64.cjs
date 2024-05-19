'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const i64 = (options = {}) => utils.numberFactory({
  name: 'i64',
  size: 8,
  range: [-BigInt('0x7fffffffffffffff') - 1n, BigInt('0x7fffffffffffffff')],
  set: (view, value, le) => view.setBigInt64(0, BigInt(value), le),
  get: (view, le) => view.getBigInt64(0, le),
  options
});

exports.i64 = i64;
//# sourceMappingURL=i64.cjs.map
