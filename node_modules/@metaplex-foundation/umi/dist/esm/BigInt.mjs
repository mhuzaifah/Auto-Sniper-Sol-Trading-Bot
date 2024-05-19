/**
 * Defines all the types that can be used to create
 * a BigInt via the <code>{@link createBigInt}</code> function.
 * @category Utils — Amounts
 */

/**
 * Creates a BigInt from a number, string, boolean, or Uint8Array.
 * @category Utils — Amounts
 */
const createBigInt = input => {
  input = typeof input === 'object' ? input.toString() : input;
  return BigInt(input);
};

export { createBigInt };
//# sourceMappingURL=BigInt.mjs.map
