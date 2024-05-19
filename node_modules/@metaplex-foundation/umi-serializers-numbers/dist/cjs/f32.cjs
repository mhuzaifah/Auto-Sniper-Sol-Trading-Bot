'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.cjs');

const f32 = (options = {}) => utils.numberFactory({
  name: 'f32',
  size: 4,
  set: (view, value, le) => view.setFloat32(0, Number(value), le),
  get: (view, le) => view.getFloat32(0, le),
  options
});

exports.f32 = f32;
//# sourceMappingURL=f32.cjs.map
