/**
 * Defines a type `T` that can also be `null`.
 * @category Utils — Options
 */
export type Nullable<T> = T | null;
/**
 * An implementation of the Rust Option type in JavaScript.
 * It can be one of the following:
 * - <code>{@link Some}<T></code>: Meaning there is a value of type T.
 * - <code>{@link None}</code>: Meaning there is no value.
 *
 * @category Utils — Options
 */
export type Option<T> = Some<T> | None;
/**
 * Defines a looser type that can be used when serializing an {@link Option}.
 * This allows us to pass null or the Option value directly whilst still
 * supporting the Option type for use-cases that need more type safety.
 *
 * @category Utils — Options
 */
export type OptionOrNullable<T> = Option<T> | Nullable<T>;
/**
 * Represents an option of type `T` that has a value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */
export type Some<T> = {
    __option: 'Some';
    value: T;
};
/**
 * Represents an option of type `T` that has no value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */
export type None = {
    __option: 'None';
};
/**
 * Creates a new {@link Option} of type `T` that has a value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */
export declare const some: <T>(value: T) => Option<T>;
/**
 * Creates a new {@link Option} of type `T` that has no value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */
export declare const none: <T>() => Option<T>;
/**
 * Whether the given data is an {@link Option}.
 * @category Utils — Options
 */
export declare const isOption: <T = unknown>(input: any) => input is Option<T>;
/**
 * Whether the given {@link Option} is a {@link Some}.
 * @category Utils — Options
 */
export declare const isSome: <T>(option: Option<T>) => option is Some<T>;
/**
 * Whether the given {@link Option} is a {@link None}.
 * @category Utils — Options
 */
export declare const isNone: <T>(option: Option<T>) => option is None;
