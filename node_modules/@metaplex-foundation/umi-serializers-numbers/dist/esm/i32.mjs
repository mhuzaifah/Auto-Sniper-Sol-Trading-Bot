import { numberFactory } from './utils.mjs';

const i32 = (options = {}) => numberFactory({
  name: 'i32',
  size: 4,
  range: [-Number('0x7fffffff') - 1, Number('0x7fffffff')],
  set: (view, value, le) => view.setInt32(0, Number(value), le),
  get: (view, le) => view.getInt32(0, le),
  options
});

export { i32 };
//# sourceMappingURL=i32.mjs.map
