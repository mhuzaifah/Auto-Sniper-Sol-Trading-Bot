import { None, Some } from './common';
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
export type UnwrappedOption<T, U = null> = T extends Some<infer TValue> ? UnwrappedOption<TValue, U> : T extends None ? U : T extends string | number | boolean | symbol | bigint | undefined | null | Uint8Array | Date ? T : T extends object ? {
    [key in keyof T]: UnwrappedOption<T[key], U>;
} : T extends Array<infer TItem> ? Array<UnwrappedOption<TItem, U>> : T;
/**
 * Recursively go through a type `T`such that all
 * nested {@link Option} types are unwrapped.
 *
 * For each nested {@link Option} type, if the option is a {@link Some},
 * it returns its value, otherwise, it returns the provided fallback value
 * which defaults to `null`.
 *
 * @category Utils — Options
 */
export declare function unwrapOptionRecursively<T>(input: T): UnwrappedOption<T>;
export declare function unwrapOptionRecursively<T, U>(input: T, fallback: () => U): UnwrappedOption<T, U>;
