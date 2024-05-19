import { mapSerializer } from '@metaplex-foundation/umi-serializers';
import { createBigInt } from './BigInt.mjs';
import { UnexpectedAmountError } from './errors/UnexpectedAmountError.mjs';
import { AmountMismatchError } from './errors/AmountMismatchError.mjs';

/**
 * The identifier of an amount.
 * @category Utils — Amounts
 */

/**
 * Creates an amount from the provided basis points, identifier, and decimals.
 * @category Utils — Amounts
 */
const createAmount = (basisPoints, identifier, decimals) => ({
  basisPoints: createBigInt(basisPoints),
  identifier,
  decimals
});

/**
 * Creates an amount from a decimal value which will be converted to the lowest
 * possible unit using the provided decimals.
 * @category Utils — Amounts
 */
const createAmountFromDecimals = (decimalAmount, identifier, decimals) => {
  const exponentAmount = createAmount(BigInt(10) ** BigInt(decimals ?? 0), identifier, decimals);
  return multiplyAmount(exponentAmount, decimalAmount);
};

/**
 * Creates a percentage amount from the provided decimal value.
 * @category Utils — Amounts
 */
const percentAmount = (percent, decimals = 2) => createAmountFromDecimals(percent, '%', decimals);

/**
 * Creates an amount of SPL tokens from the provided decimal value.
 * @category Utils — Amounts
 */
const tokenAmount = (tokens, identifier, decimals) => createAmountFromDecimals(tokens, identifier ?? 'splToken', decimals ?? 0);

/**
 * Creates a {@link SolAmount} from the provided lamports.
 * @category Utils — Amounts
 */
const lamports = lamports => createAmount(lamports, 'SOL', 9);

/**
 * Creates a {@link SolAmount} from the provided decimal value in SOL.
 * @category Utils — Amounts
 */
const sol = sol => createAmountFromDecimals(sol, 'SOL', 9);

/**
 * Creates a {@link UsdAmount} from the provided decimal value in USD.
 * @category Utils — Amounts
 */
const usd = usd => createAmountFromDecimals(usd, 'USD', 2);

/**
 * Determines whether a given amount has the provided identifier and decimals.
 * @category Utils — Amounts
 */
const isAmount = (amount, identifier, decimals) => amount.identifier === identifier && amount.decimals === decimals;

/**
 * Determines whether a given amount is a {@link SolAmount}.
 * @category Utils — Amounts
 */
const isSolAmount = amount => isAmount(amount, 'SOL', 9);

/**
 * Determines whether two amounts are of the same type.
 * @category Utils — Amounts
 */
const sameAmounts = (left, right) => isAmount(left, right.identifier, right.decimals);

/**
 * Ensures that a given amount has the provided identifier and decimals.
 * @category Utils — Amounts
 */
function assertAmount(amount, identifier, decimals) {
  if (!isAmount(amount, identifier, decimals)) {
    throw new UnexpectedAmountError(amount, identifier, decimals);
  }
}

/**
 * Ensures that a given amount is a {@link SolAmount}.
 * @category Utils — Amounts
 */
function assertSolAmount(actual) {
  assertAmount(actual, 'SOL', 9);
}

/**
 * Ensures that two amounts are of the same type.
 * @category Utils — Amounts
 */
function assertSameAmounts(left, right, operation) {
  if (!sameAmounts(left, right)) {
    throw new AmountMismatchError(left, right, operation);
  }
}

/**
 * Adds two amounts of the same type.
 * @category Utils — Amounts
 */
const addAmounts = (left, right) => {
  assertSameAmounts(left, right, 'add');
  return {
    ...left,
    basisPoints: left.basisPoints + right.basisPoints
  };
};

/**
 * Subtracts two amounts of the same type.
 * @category Utils — Amounts
 */
const subtractAmounts = (left, right) => {
  assertSameAmounts(left, right, 'subtract');
  return {
    ...left,
    basisPoints: left.basisPoints - right.basisPoints
  };
};

/**
 * Multiplies an amount by a given multiplier.
 * @category Utils — Amounts
 */
const multiplyAmount = (left, multiplier) => {
  if (typeof multiplier === 'bigint') {
    return {
      ...left,
      basisPoints: left.basisPoints * multiplier
    };
  }
  const [units, decimals] = multiplier.toString().split('.');
  const multiplierBasisPoints = BigInt(units + (decimals ?? ''));
  const multiplierExponents = BigInt(10) ** BigInt(decimals?.length ?? 0);
  return {
    ...left,
    basisPoints: left.basisPoints * multiplierBasisPoints / multiplierExponents
  };
};

/**
 * Divides an amount by a given divisor.
 * @category Utils — Amounts
 */
const divideAmount = (left, divisor) => {
  if (typeof divisor === 'bigint') {
    return {
      ...left,
      basisPoints: left.basisPoints / divisor
    };
  }
  const [units, decimals] = divisor.toString().split('.');
  const divisorBasisPoints = BigInt(units + (decimals ?? ''));
  const divisorExponents = BigInt(10) ** BigInt(decimals?.length ?? 0);
  return {
    ...left,
    basisPoints: left.basisPoints * divisorExponents / divisorBasisPoints
  };
};

/**
 * Returns the absolute value of an amount.
 * @category Utils — Amounts
 */
const absoluteAmount = value => {
  const x = value.basisPoints;
  return {
    ...value,
    basisPoints: x < 0 ? -x : x
  };
};

/**
 * Compares two amounts of the same type.
 * @category Utils — Amounts
 */
const compareAmounts = (left, right) => {
  assertSameAmounts(left, right, 'compare');
  if (left.basisPoints > right.basisPoints) return 1;
  if (left.basisPoints < right.basisPoints) return -1;
  return 0;
};

/**
 * Determines whether two amounts are equal.
 * An optional tolerance can be provided to allow for small differences.
 * When using {@link SolAmount}, this is usually due to transaction or small storage fees.
 * @category Utils — Amounts
 */
const isEqualToAmount = (left, right, tolerance) => {
  tolerance = tolerance ?? createAmount(0, left.identifier, left.decimals);
  assertSameAmounts(left, right, 'isEqualToAmount');
  assertSameAmounts(left, tolerance, 'isEqualToAmount');
  const delta = absoluteAmount(subtractAmounts(left, right));
  return isLessThanOrEqualToAmount(delta, tolerance);
};

/**
 * Whether the left amount is less than the right amount.
 * @category Utils — Amounts
 */
const isLessThanAmount = (left, right) => compareAmounts(left, right) < 0;

/**
 * Whether the left amount is less than or equal to the right amount.
 * @category Utils — Amounts
 */
const isLessThanOrEqualToAmount = (left, right) => compareAmounts(left, right) <= 0;

/**
 * Whether the left amount is greater than the right amount.
 * @category Utils — Amounts
 */
const isGreaterThanAmount = (left, right) => compareAmounts(left, right) > 0;

/**
 * Whether the left amount is greater than or equal to the right amount.
 * @category Utils — Amounts
 */
const isGreaterThanOrEqualToAmount = (left, right) => compareAmounts(left, right) >= 0;

/**
 * Whether the amount is zero.
 * @category Utils — Amounts
 */
const isZeroAmount = value => value.basisPoints === BigInt(0);

/**
 * Whether the amount is positive.
 * @category Utils — Amounts
 */
const isPositiveAmount = value => value.basisPoints >= BigInt(0);

/**
 * Whether the amount is negative.
 * @category Utils — Amounts
 */
const isNegativeAmount = value => value.basisPoints < BigInt(0);

/**
 * Converts an amount to a string by using the amount's decimals.
 * @category Utils — Amounts
 */
const amountToString = (value, maxDecimals) => {
  let text = value.basisPoints.toString();
  if (value.decimals === 0) {
    return text;
  }
  const sign = text.startsWith('-') ? '-' : '';
  text = text.replace('-', '');
  text = text.padStart(value.decimals + 1, '0');
  const units = text.slice(0, -value.decimals);
  let decimals = text.slice(-value.decimals);
  if (maxDecimals !== undefined) {
    decimals = decimals.slice(0, maxDecimals);
  }
  return `${sign + units}.${decimals}`;
};

/**
 * Converts an amount to a number by using the amount's decimals.
 * Note that this may throw an error if the amount is too large to fit in a JavaScript number.
 * @category Utils — Amounts
 */
const amountToNumber = value => parseFloat(amountToString(value));

/**
 * Displays an amount as a string by using the amount's decimals and identifier.
 * @category Utils — Amounts
 */
const displayAmount = (value, maxDecimals) => {
  const amountAsString = amountToString(value, maxDecimals);
  switch (value.identifier) {
    case '%':
      return `${amountAsString}%`;
    case 'splToken':
      return /^1(\.0+)?$/.test(amountAsString) ? `${amountAsString} Token` : `${amountAsString} Tokens`;
    default:
      if (value.identifier.startsWith('splToken.')) {
        const [, identifier] = value.identifier.split('.');
        return `${identifier} ${amountAsString}`;
      }
      return `${value.identifier} ${amountAsString}`;
  }
};

/**
 * Converts a number serializer into an amount serializer
 * by providing an amount identifier and decimals.
 * @category Utils — Amounts
 */
const mapAmountSerializer = (serializer, identifier, decimals) => mapSerializer(serializer, value => value.basisPoints > Number.MAX_SAFE_INTEGER ? value.basisPoints : Number(value.basisPoints), value => createAmount(value, identifier, decimals));

export { absoluteAmount, addAmounts, amountToNumber, amountToString, assertAmount, assertSameAmounts, assertSolAmount, compareAmounts, createAmount, createAmountFromDecimals, displayAmount, divideAmount, isAmount, isEqualToAmount, isGreaterThanAmount, isGreaterThanOrEqualToAmount, isLessThanAmount, isLessThanOrEqualToAmount, isNegativeAmount, isPositiveAmount, isSolAmount, isZeroAmount, lamports, mapAmountSerializer, multiplyAmount, percentAmount, sameAmounts, sol, subtractAmounts, tokenAmount, usd };
//# sourceMappingURL=Amount.mjs.map
