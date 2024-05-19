import { isOption, isSome } from './common.mjs';

/**
 * A type that defines the recursive unwrapping of a type `T`
 * such that all nested {@link Option} types are unwrapped.
 *
 * For each nested {@link Option} type, if the option is a {@link Some},
 * it returns the type of its value, otherwise, it returns the provided
 * fallback type `U` which defaults to `null`.
 *
 * @category Utils — Options
 */

function unwrapOptionRecursively(input, fallback) {
  // Types to bypass.
  if (!input || ArrayBuffer.isView(input)) {
    return input;
  }
  const next = x => fallback ? unwrapOptionRecursively(x, fallback) : unwrapOptionRecursively(x);

  // Handle Option.
  if (isOption(input)) {
    if (isSome(input)) return next(input.value);
    return fallback ? fallback() : null;
  }

  // Walk.
  if (Array.isArray(input)) {
    return input.map(next);
  }
  if (typeof input === 'object') {
    return Object.fromEntries(Object.entries(input).map(([k, v]) => [k, next(v)]));
  }
  return input;
}

export { unwrapOptionRecursively };
//# sourceMappingURL=unwrapOptionRecursively.mjs.map
