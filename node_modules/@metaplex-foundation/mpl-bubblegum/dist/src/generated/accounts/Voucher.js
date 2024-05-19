"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherBeet = exports.Voucher = exports.voucherDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const LeafSchema_1 = require("../types/LeafSchema");
exports.voucherDiscriminator = [191, 204, 149, 234, 213, 165, 13, 65];
class Voucher {
    constructor(leafSchema, index, merkleTree) {
        this.leafSchema = leafSchema;
        this.index = index;
        this.merkleTree = merkleTree;
    }
    static fromArgs(args) {
        return new Voucher(args.leafSchema, args.index, args.merkleTree);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Voucher.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Voucher account at ${address}`);
        }
        return Voucher.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.voucherBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.voucherBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.voucherBeet.serialize({
            accountDiscriminator: exports.voucherDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Voucher.fromArgs(args);
        return exports.voucherBeet.toFixedFromValue({
            accountDiscriminator: exports.voucherDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Voucher.byteSize(args), commitment);
    }
    pretty() {
        return {
            leafSchema: this.leafSchema.__kind,
            index: this.index,
            merkleTree: this.merkleTree.toBase58(),
        };
    }
}
exports.Voucher = Voucher;
exports.voucherBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['leafSchema', LeafSchema_1.leafSchemaBeet],
    ['index', beet.u32],
    ['merkleTree', beetSolana.publicKey],
], Voucher.fromArgs, 'Voucher');
//# sourceMappingURL=Voucher.js.map