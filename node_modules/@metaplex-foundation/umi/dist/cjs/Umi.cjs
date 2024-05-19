'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Context = require('./Context.cjs');

/**
 * Creates a Umi instance using only Null implementations of the interfaces.
 * The `use` method can then be used to install plugins and replace the
 * Null implementations with real implementations.
 *
 * @category Context and Interfaces
 */
const createUmi = () => ({
  ...Context.createNullContext(),
  use(plugin) {
    plugin.install(this);
    return this;
  }
});

exports.createUmi = createUmi;
//# sourceMappingURL=Umi.cjs.map
