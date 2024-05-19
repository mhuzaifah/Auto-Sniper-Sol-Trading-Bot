import { NumberSerializer, Serializer } from '@metaplex-foundation/umi-serializers';
import { BigIntInput } from './BigInt';
/**
 * The identifier of an amount.
 * @category Utils — Amounts
 */
export type AmountIdentifier = 'SOL' | 'USD' | '%' | 'splToken' | string;
/**
 * The number of decimals in an amount represented using the lowest possible unit.
 * @category Utils — Amounts
 */
export type AmountDecimals = number;
/**
 * Describes an amount of any type or currency using the lowest possible unit.
 * It uses a BigInt to represent the basis points of the amount, a decimal number
 * to know how to interpret the basis points, and an identifier to know what
 * type of amount we are dealing with.
 *
 * Custom type parameters can be used to represent specific types of amounts.
 * For example:
 * - Amount<'SOL', 9> represents an amount of SOL in lamports.
 * - Amount<'USD', 2> represents an amount of USD in cents.
 * - Amount<'%', 2> represents a percentage with 2 decimals.
 *
 * @category Utils — Amounts
 */
export type Amount<I extends AmountIdentifier = AmountIdentifier, D extends AmountDecimals = AmountDecimals> = {
    /** The amount in its lower possible unit such that it does not contain decimals. */
    basisPoints: bigint;
    /** The identifier of the amount. */
    identifier: I;
    /** The number of decimals in the amount. */
    decimals: D;
};
/**
 * An amount of SOL represented using the lowest possible unit — i.e. lamports.
 * @category Utils — Amounts
 */
export type SolAmount = Amount<'SOL', 9>;
/**
 * An amount of US dollars represented using the lowest possible unit — i.e. cents.
 * @category Utils — Amounts
 */
export type UsdAmount = Amount<'USD', 2>;
/**
 * An percentage represented in basis points using a given number of decimals.
 * @category Utils — Amounts
 */
export type PercentAmount<D extends AmountDecimals> = Amount<'%', D>;
/**
 * Creates an amount from the provided basis points, identifier, and decimals.
 * @category Utils — Amounts
 */
export declare const createAmount: <I extends string, D extends number>(basisPoints: BigIntInput, identifier: I, decimals: D) => Amount<I, D>;
/**
 * Creates an amount from a decimal value which will be converted to the lowest
 * possible unit using the provided decimals.
 * @category Utils — Amounts
 */
export declare const createAmountFromDecimals: <I extends string, D extends number>(decimalAmount: number, identifier: I, decimals: D) => Amount<I, D>;
/**
 * Creates a percentage amount from the provided decimal value.
 * @category Utils — Amounts
 */
export declare const percentAmount: <D extends number>(percent: number, decimals?: D) => Amount<"%", D>;
/**
 * Creates an amount of SPL tokens from the provided decimal value.
 * @category Utils — Amounts
 */
export declare const tokenAmount: <I extends string, D extends number>(tokens: number, identifier?: I | undefined, decimals?: D | undefined) => Amount<I, D>;
/**
 * Creates a {@link SolAmount} from the provided lamports.
 * @category Utils — Amounts
 */
export declare const lamports: (lamports: BigIntInput) => SolAmount;
/**
 * Creates a {@link SolAmount} from the provided decimal value in SOL.
 * @category Utils — Amounts
 */
export declare const sol: (sol: number) => SolAmount;
/**
 * Creates a {@link UsdAmount} from the provided decimal value in USD.
 * @category Utils — Amounts
 */
export declare const usd: (usd: number) => UsdAmount;
/**
 * Determines whether a given amount has the provided identifier and decimals.
 * @category Utils — Amounts
 */
export declare const isAmount: <I extends string, D extends number>(amount: Amount, identifier: I, decimals: D) => amount is Amount<I, D>;
/**
 * Determines whether a given amount is a {@link SolAmount}.
 * @category Utils — Amounts
 */
export declare const isSolAmount: (amount: Amount) => amount is SolAmount;
/**
 * Determines whether two amounts are of the same type.
 * @category Utils — Amounts
 */
export declare const sameAmounts: (left: Amount, right: Amount) => boolean;
/**
 * Ensures that a given amount has the provided identifier and decimals.
 * @category Utils — Amounts
 */
export declare function assertAmount<I extends AmountIdentifier, D extends AmountDecimals>(amount: Amount, identifier: I, decimals: D): asserts amount is Amount<I, D>;
/**
 * Ensures that a given amount is a {@link SolAmount}.
 * @category Utils — Amounts
 */
export declare function assertSolAmount(actual: Amount): asserts actual is SolAmount;
/**
 * Ensures that two amounts are of the same type.
 * @category Utils — Amounts
 */
export declare function assertSameAmounts(left: Amount, right: Amount, operation?: string): void;
/**
 * Adds two amounts of the same type.
 * @category Utils — Amounts
 */
export declare const addAmounts: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>) => Amount<I, D>;
/**
 * Subtracts two amounts of the same type.
 * @category Utils — Amounts
 */
export declare const subtractAmounts: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>) => Amount<I, D>;
/**
 * Multiplies an amount by a given multiplier.
 * @category Utils — Amounts
 */
export declare const multiplyAmount: <I extends string, D extends number>(left: Amount<I, D>, multiplier: number | bigint) => Amount<I, D>;
/**
 * Divides an amount by a given divisor.
 * @category Utils — Amounts
 */
export declare const divideAmount: <I extends string, D extends number>(left: Amount<I, D>, divisor: number | bigint) => Amount<I, D>;
/**
 * Returns the absolute value of an amount.
 * @category Utils — Amounts
 */
export declare const absoluteAmount: <I extends string, D extends number>(value: Amount<I, D>) => Amount<I, D>;
/**
 * Compares two amounts of the same type.
 * @category Utils — Amounts
 */
export declare const compareAmounts: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>) => -1 | 0 | 1;
/**
 * Determines whether two amounts are equal.
 * An optional tolerance can be provided to allow for small differences.
 * When using {@link SolAmount}, this is usually due to transaction or small storage fees.
 * @category Utils — Amounts
 */
export declare const isEqualToAmount: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>, tolerance?: Amount<I, D> | undefined) => boolean;
/**
 * Whether the left amount is less than the right amount.
 * @category Utils — Amounts
 */
export declare const isLessThanAmount: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>) => boolean;
/**
 * Whether the left amount is less than or equal to the right amount.
 * @category Utils — Amounts
 */
export declare const isLessThanOrEqualToAmount: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>) => boolean;
/**
 * Whether the left amount is greater than the right amount.
 * @category Utils — Amounts
 */
export declare const isGreaterThanAmount: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>) => boolean;
/**
 * Whether the left amount is greater than or equal to the right amount.
 * @category Utils — Amounts
 */
export declare const isGreaterThanOrEqualToAmount: <I extends string, D extends number>(left: Amount<I, D>, right: Amount<I, D>) => boolean;
/**
 * Whether the amount is zero.
 * @category Utils — Amounts
 */
export declare const isZeroAmount: (value: Amount) => boolean;
/**
 * Whether the amount is positive.
 * @category Utils — Amounts
 */
export declare const isPositiveAmount: (value: Amount) => boolean;
/**
 * Whether the amount is negative.
 * @category Utils — Amounts
 */
export declare const isNegativeAmount: (value: Amount) => boolean;
/**
 * Converts an amount to a string by using the amount's decimals.
 * @category Utils — Amounts
 */
export declare const amountToString: (value: Amount, maxDecimals?: number) => string;
/**
 * Converts an amount to a number by using the amount's decimals.
 * Note that this may throw an error if the amount is too large to fit in a JavaScript number.
 * @category Utils — Amounts
 */
export declare const amountToNumber: (value: Amount) => number;
/**
 * Displays an amount as a string by using the amount's decimals and identifier.
 * @category Utils — Amounts
 */
export declare const displayAmount: (value: Amount, maxDecimals?: number) => string;
/**
 * Converts a number serializer into an amount serializer
 * by providing an amount identifier and decimals.
 * @category Utils — Amounts
 */
export declare const mapAmountSerializer: <I extends string = string, D extends number = number>(serializer: NumberSerializer, identifier: I, decimals: D) => Serializer<Amount<I, D>, Amount<I, D>>;
