'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const u16 = (options = {}) => utils.numberFactory({
  name: 'u16',
  size: 2,
  range: [0, Number('0xffff')],
  set: (view, value, le) => view.setUint16(0, Number(value), le),
  get: (view, le) => view.getUint16(0, le),
  options
});

exports.u16 = u16;
//# sourceMappingURL=u16.cjs.map
