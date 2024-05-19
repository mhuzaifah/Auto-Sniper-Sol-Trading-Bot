'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const u32 = (options = {}) => utils.numberFactory({
  name: 'u32',
  size: 4,
  range: [0, Number('0xffffffff')],
  set: (view, value, le) => view.setUint32(0, Number(value), le),
  get: (view, le) => view.getUint32(0, le),
  options
});

exports.u32 = u32;
//# sourceMappingURL=u32.cjs.map
