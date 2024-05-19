import * as beet from '@metaplex-foundation/beet';
export declare enum TokenStandard {
    NonFungible = 0,
    FungibleAsset = 1,
    Fungible = 2,
    NonFungibleEdition = 3
}
export declare const tokenStandardBeet: beet.FixedSizeBeet<TokenStandard, TokenStandard>;
