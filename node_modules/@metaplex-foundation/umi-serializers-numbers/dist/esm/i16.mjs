import { numberFactory } from './utils.mjs';

const i16 = (options = {}) => numberFactory({
  name: 'i16',
  size: 2,
  range: [-Number('0x7fff') - 1, Number('0x7fff')],
  set: (view, value, le) => view.setInt16(0, Number(value), le),
  get: (view, le) => view.getInt16(0, le),
  options
});

export { i16 };
//# sourceMappingURL=i16.mjs.map
