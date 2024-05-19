import { createNullContext } from './Context.mjs';

/**
 * Creates a Umi instance using only Null implementations of the interfaces.
 * The `use` method can then be used to install plugins and replace the
 * Null implementations with real implementations.
 *
 * @category Context and Interfaces
 */
const createUmi = () => ({
  ...createNullContext(),
  use(plugin) {
    plugin.install(this);
    return this;
  }
});

export { createUmi };
//# sourceMappingURL=Umi.mjs.map
