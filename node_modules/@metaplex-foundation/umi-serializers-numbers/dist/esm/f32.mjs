import { numberFactory } from './utils.mjs';

const f32 = (options = {}) => numberFactory({
  name: 'f32',
  size: 4,
  set: (view, value, le) => view.setFloat32(0, Number(value), le),
  get: (view, le) => view.getFloat32(0, le),
  options
});

export { f32 };
//# sourceMappingURL=f32.mjs.map
