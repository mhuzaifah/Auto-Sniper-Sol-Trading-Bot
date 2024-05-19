/**
 * Defines a type `T` that can also be `null`.
 * @category Utils — Options
 */

/**
 * An implementation of the Rust Option type in JavaScript.
 * It can be one of the following:
 * - <code>{@link Some}<T></code>: Meaning there is a value of type T.
 * - <code>{@link None}</code>: Meaning there is no value.
 *
 * @category Utils — Options
 */

/**
 * Defines a looser type that can be used when serializing an {@link Option}.
 * This allows us to pass null or the Option value directly whilst still
 * supporting the Option type for use-cases that need more type safety.
 *
 * @category Utils — Options
 */

/**
 * Represents an option of type `T` that has a value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */

/**
 * Represents an option of type `T` that has no value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */

/**
 * Creates a new {@link Option} of type `T` that has a value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */
const some = value => ({
  __option: 'Some',
  value
});

/**
 * Creates a new {@link Option} of type `T` that has no value.
 *
 * @see {@link Option}
 * @category Utils — Options
 */
const none = () => ({
  __option: 'None'
});

/**
 * Whether the given data is an {@link Option}.
 * @category Utils — Options
 */
const isOption = input => input && typeof input === 'object' && '__option' in input && (input.__option === 'Some' && 'value' in input || input.__option === 'None');

/**
 * Whether the given {@link Option} is a {@link Some}.
 * @category Utils — Options
 */
const isSome = option => option.__option === 'Some';

/**
 * Whether the given {@link Option} is a {@link None}.
 * @category Utils — Options
 */
const isNone = option => option.__option === 'None';

export { isNone, isOption, isSome, none, some };
//# sourceMappingURL=common.mjs.map
