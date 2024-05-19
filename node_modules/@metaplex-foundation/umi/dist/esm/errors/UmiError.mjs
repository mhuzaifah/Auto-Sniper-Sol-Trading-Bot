/** @category Errors */
class UmiError extends Error {
  name = 'UmiError';
  constructor(message, source, sourceDetails, cause) {
    super(message);
    this.source = source;
    this.sourceDetails = sourceDetails;
    this.cause = cause;
    this.message = `${this.message}\n\nSource: ${this.getFullSource()}${this.cause ? `\n\nCaused By: ${this.cause}` : ''}\n`;
  }
  getCapitalizedSource() {
    if (this.source === 'sdk' || this.source === 'rpc') {
      return this.source.toUpperCase();
    }
    return this.source[0].toUpperCase() + this.source.slice(1);
  }
  getFullSource() {
    const capitalizedSource = this.getCapitalizedSource();
    const sourceDetails = this.sourceDetails ? ` > ${this.sourceDetails}` : '';
    return capitalizedSource + sourceDetails;
  }
  toString() {
    return `[${this.name}] ${this.message}`;
  }
}

/** @category Errors */

export { UmiError };
//# sourceMappingURL=UmiError.mjs.map
