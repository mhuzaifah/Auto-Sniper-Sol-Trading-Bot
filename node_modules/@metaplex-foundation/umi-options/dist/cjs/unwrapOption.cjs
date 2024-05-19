'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var common = require('./common.cjs');

/**
 * Unwraps the value of an {@link Option} of type `T`
 * or returns a fallback value that defaults to `null`.
 *
 * @category Utils — Options
 */

function unwrapOption(option, fallback) {
  if (common.isSome(option)) return option.value;
  return fallback ? fallback() : null;
}

/**
 * Wraps a nullable value into an {@link Option}.
 *
 * @category Utils — Options
 */
const wrapNullable = nullable => nullable !== null ? common.some(nullable) : common.none();

/**
 * Unwraps the value of an {@link Option} of type `T`.
 * If the option is a {@link Some}, it returns its value,
 * Otherwise, it returns `null`.
 *
 * @category Utils — Options
 * @deprecated Use {@link unwrapOption} instead.
 */
const unwrapSome = option => common.isSome(option) ? option.value : null;

/**
 * Unwraps the value of an {@link Option} of type `T`
 * or returns a custom fallback value.
 * If the option is a {@link Some}, it returns its value,
 * Otherwise, it returns the return value of the provided fallback callback.
 *
 * @category Utils — Options
 * @deprecated Use {@link unwrapOption} instead.
 */
const unwrapSomeOrElse = (option, fallback) => common.isSome(option) ? option.value : fallback();

exports.unwrapOption = unwrapOption;
exports.unwrapSome = unwrapSome;
exports.unwrapSomeOrElse = unwrapSomeOrElse;
exports.wrapNullable = wrapNullable;
//# sourceMappingURL=unwrapOption.cjs.map
