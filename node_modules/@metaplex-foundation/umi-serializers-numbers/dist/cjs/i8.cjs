'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const i8 = (options = {}) => utils.numberFactory({
  name: 'i8',
  size: 1,
  range: [-Number('0x7f') - 1, Number('0x7f')],
  set: (view, value) => view.setInt8(0, Number(value)),
  get: view => view.getInt8(0),
  options
});

exports.i8 = i8;
//# sourceMappingURL=i8.cjs.map
