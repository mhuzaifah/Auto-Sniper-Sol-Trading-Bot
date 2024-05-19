import { numberFactory } from './utils.mjs';

const f64 = (options = {}) => numberFactory({
  name: 'f64',
  size: 8,
  set: (view, value, le) => view.setFloat64(0, Number(value), le),
  get: (view, le) => view.getFloat64(0, le),
  options
});

export { f64 };
//# sourceMappingURL=f64.mjs.map
