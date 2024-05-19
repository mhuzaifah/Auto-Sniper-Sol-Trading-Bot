'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const f64 = (options = {}) => utils.numberFactory({
  name: 'f64',
  size: 8,
  set: (view, value, le) => view.setFloat64(0, Number(value), le),
  get: (view, le) => view.getFloat64(0, le),
  options
});

exports.f64 = f64;
//# sourceMappingURL=f64.cjs.map
