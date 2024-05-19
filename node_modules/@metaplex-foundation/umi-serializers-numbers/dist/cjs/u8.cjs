'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const u8 = (options = {}) => utils.numberFactory({
  name: 'u8',
  size: 1,
  range: [0, Number('0xff')],
  set: (view, value) => view.setUint8(0, Number(value)),
  get: view => view.getUint8(0),
  options
});

exports.u8 = u8;
//# sourceMappingURL=u8.cjs.map
