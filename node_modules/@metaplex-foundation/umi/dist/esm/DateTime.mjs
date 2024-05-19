import { mapSerializer } from '@metaplex-foundation/umi-serializers';
import { createBigInt } from './BigInt.mjs';

/**
 * Defines a string that can be parsed into a Date object.
 * For instance, `"2020-01-01T00:00:00.000Z"`.
 * @category Utils — DateTime
 */

/**
 * Creates a {@link DateTime} from a {@link DateTimeInput}.
 * @category Utils — DateTime
 */
const dateTime = value => {
  if (typeof value === 'string' || isDateObject(value)) {
    const date = new Date(value);
    const timestamp = Math.floor(date.getTime() / 1000);
    return createBigInt(timestamp);
  }
  return createBigInt(value);
};

/**
 * Helper function to get the current time as a {@link DateTime}.
 * @category Utils — DateTime
 */
const now = () => dateTime(new Date(Date.now()));

/**
 * Whether the given value is a Date object.
 * @category Utils — DateTime
 */
const isDateObject = value => Object.prototype.toString.call(value) === '[object Date]';

/**
 * Formats a {@link DateTime} as a string.
 * @category Utils — DateTime
 */
const formatDateTime = (value, locales = 'en-US', options = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}) => {
  const date = new Date(Number(value * 1000n));
  return date.toLocaleDateString(locales, options);
};

/**
 * Converts a number serializer into a DateTime serializer.
 * @category Utils — DateTime
 */
const mapDateTimeSerializer = serializer => mapSerializer(serializer, value => {
  const date = dateTime(value);
  return date > Number.MAX_SAFE_INTEGER ? date : Number(date);
}, value => dateTime(value));

export { dateTime, formatDateTime, mapDateTimeSerializer, now };
//# sourceMappingURL=DateTime.mjs.map
