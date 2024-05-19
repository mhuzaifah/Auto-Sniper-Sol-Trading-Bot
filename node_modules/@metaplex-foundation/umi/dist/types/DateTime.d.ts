import { NumberSerializer, Serializer } from '@metaplex-foundation/umi-serializers';
import { BigIntInput } from './BigInt';
/**
 * Defines a string that can be parsed into a Date object.
 * For instance, `"2020-01-01T00:00:00.000Z"`.
 * @category Utils — DateTime
 */
export type DateTimeString = string;
/**
 * Defines all the types that can be used to create a DateTime.
 * @category Utils — DateTime
 */
export type DateTimeInput = DateTimeString | BigIntInput | Date;
/**
 * Defines a point in time via a Unix timestamp represented as a BigInt.
 * @category Utils — DateTime
 */
export type DateTime = bigint;
/**
 * Creates a {@link DateTime} from a {@link DateTimeInput}.
 * @category Utils — DateTime
 */
export declare const dateTime: (value: DateTimeInput) => DateTime;
/**
 * Helper function to get the current time as a {@link DateTime}.
 * @category Utils — DateTime
 */
export declare const now: () => DateTime;
/**
 * Formats a {@link DateTime} as a string.
 * @category Utils — DateTime
 */
export declare const formatDateTime: (value: DateTime, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions) => string;
/**
 * Converts a number serializer into a DateTime serializer.
 * @category Utils — DateTime
 */
export declare const mapDateTimeSerializer: (serializer: NumberSerializer) => Serializer<DateTimeInput, DateTime>;
