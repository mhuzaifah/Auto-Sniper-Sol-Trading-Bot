import { Nullable, Option } from './common';
/**
 * Unwraps the value of an {@link Option} of type `T`
 * or returns a fallback value that defaults to `null`.
 *
 * @category Utils — Options
 */
export declare function unwrapOption<T>(option: Option<T>): Nullable<T>;
export declare function unwrapOption<T, U>(option: Option<T>, fallback: () => U): T | U;
/**
 * Wraps a nullable value into an {@link Option}.
 *
 * @category Utils — Options
 */
export declare const wrapNullable: <T>(nullable: Nullable<T>) => Option<T>;
/**
 * Unwraps the value of an {@link Option} of type `T`.
 * If the option is a {@link Some}, it returns its value,
 * Otherwise, it returns `null`.
 *
 * @category Utils — Options
 * @deprecated Use {@link unwrapOption} instead.
 */
export declare const unwrapSome: <T>(option: Option<T>) => Nullable<T>;
/**
 * Unwraps the value of an {@link Option} of type `T`
 * or returns a custom fallback value.
 * If the option is a {@link Some}, it returns its value,
 * Otherwise, it returns the return value of the provided fallback callback.
 *
 * @category Utils — Options
 * @deprecated Use {@link unwrapOption} instead.
 */
export declare const unwrapSomeOrElse: <T, U>(option: Option<T>, fallback: () => U) => T | U;
