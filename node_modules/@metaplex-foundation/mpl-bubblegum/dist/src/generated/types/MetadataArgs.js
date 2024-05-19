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
exports.metadataArgsBeet = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const TokenStandard_1 = require("./TokenStandard");
const Collection_1 = require("./Collection");
const Uses_1 = require("./Uses");
const TokenProgramVersion_1 = require("./TokenProgramVersion");
const Creator_1 = require("./Creator");
exports.metadataArgsBeet = new beet.FixableBeetArgsStruct([
    ['name', beet.utf8String],
    ['symbol', beet.utf8String],
    ['uri', beet.utf8String],
    ['sellerFeeBasisPoints', beet.u16],
    ['primarySaleHappened', beet.bool],
    ['isMutable', beet.bool],
    ['editionNonce', beet.coption(beet.u8)],
    ['tokenStandard', beet.coption(TokenStandard_1.tokenStandardBeet)],
    ['collection', beet.coption(Collection_1.collectionBeet)],
    ['uses', beet.coption(Uses_1.usesBeet)],
    ['tokenProgramVersion', TokenProgramVersion_1.tokenProgramVersionBeet],
    ['creators', beet.array(Creator_1.creatorBeet)],
], 'MetadataArgs');
//# sourceMappingURL=MetadataArgs.js.map