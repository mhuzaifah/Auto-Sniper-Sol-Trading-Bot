import { isSome, some, none } from './common.mjs';

/**
 * Unwraps the value of an {@link Option} of type `T`
 * or returns a fallback value that defaults to `null`.
 *
 * @category Utils — Options
 */

function unwrapOption(option, fallback) {
  if (isSome(option)) return option.value;
  return fallback ? fallback() : null;
}

/**
 * Wraps a nullable value into an {@link Option}.
 *
 * @category Utils — Options
 */
const wrapNullable = nullable => nullable !== null ? some(nullable) : none();

/**
 * Unwraps the value of an {@link Option} of type `T`.
 * If the option is a {@link Some}, it returns its value,
 * Otherwise, it returns `null`.
 *
 * @category Utils — Options
 * @deprecated Use {@link unwrapOption} instead.
 */
const unwrapSome = option => isSome(option) ? option.value : null;

/**
 * Unwraps the value of an {@link Option} of type `T`
 * or returns a custom fallback value.
 * If the option is a {@link Some}, it returns its value,
 * Otherwise, it returns the return value of the provided fallback callback.
 *
 * @category Utils — Options
 * @deprecated Use {@link unwrapOption} instead.
 */
const unwrapSomeOrElse = (option, fallback) => isSome(option) ? option.value : fallback();

export { unwrapOption, unwrapSome, unwrapSomeOrElse, wrapNullable };
//# sourceMappingURL=unwrapOption.mjs.map
