/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { LeafSchema } from '../types/LeafSchema';
export type VoucherArgs = {
    leafSchema: LeafSchema;
    index: number;
    merkleTree: web3.PublicKey;
};
export declare const voucherDiscriminator: number[];
export declare class Voucher implements VoucherArgs {
    readonly leafSchema: LeafSchema;
    readonly index: number;
    readonly merkleTree: web3.PublicKey;
    private constructor();
    static fromArgs(args: VoucherArgs): Voucher;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Voucher, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Voucher>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<VoucherArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Voucher, number];
    serialize(): [Buffer, number];
    static byteSize(args: VoucherArgs): number;
    static getMinimumBalanceForRentExemption(args: VoucherArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        leafSchema: "V1";
        index: number;
        merkleTree: string;
    };
}
export declare const voucherBeet: beet.FixableBeetStruct<Voucher, VoucherArgs & {
    accountDiscriminator: number[];
}>;
