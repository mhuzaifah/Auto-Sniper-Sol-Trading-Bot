import * as beet from '@metaplex-foundation/beet';
export declare enum BubblegumEventType {
    Uninitialized = 0,
    LeafSchemaEvent = 1
}
export declare const bubblegumEventTypeBeet: beet.FixedSizeBeet<BubblegumEventType, BubblegumEventType>;
