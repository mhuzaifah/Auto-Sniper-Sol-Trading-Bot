import * as beet from '@metaplex-foundation/beet';
export declare enum TokenProgramVersion {
    Original = 0,
    Token2022 = 1
}
export declare const tokenProgramVersionBeet: beet.FixedSizeBeet<TokenProgramVersion, TokenProgramVersion>;
