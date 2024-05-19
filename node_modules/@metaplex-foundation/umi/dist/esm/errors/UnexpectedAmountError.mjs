import { SdkError } from './SdkError.mjs';

/** @category Errors */
class UnexpectedAmountError extends SdkError {
  name = 'UnexpectedAmountError';
  constructor(amount, expectedIdentifier, expectedDecimals) {
    const message = `Expected amount of type [${expectedIdentifier} with ${expectedDecimals} decimals] ` + `but got [${amount.identifier} with ${amount.decimals} decimals]. ` + `Ensure the provided Amount is of the expected type.`;
    super(message);
    this.amount = amount;
    this.expectedIdentifier = expectedIdentifier;
    this.expectedDecimals = expectedDecimals;
  }
}

export { UnexpectedAmountError };
//# sourceMappingURL=UnexpectedAmountError.mjs.map
