"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWebsiteOrSocialMedia = exports.connection = void 0;
const web3_js_1 = require("@solana/web3.js");
const config_1 = require("./config");
const raydium_sdk_1 = require("@raydium-io/raydium-sdk");
const poolKeys_1 = require("./poolKeys");
const snipe_1 = require("./snipe");
const spl_token_1 = require("@solana/spl-token");
const axios_1 = __importDefault(require("axios"));
const js_1 = require("@metaplex-foundation/js");
exports.connection = new web3_js_1.Connection(config_1.RPC_URL, { wsEndpoint: config_1.WS_URL, commitment: "confirmed" });
const seenTx = [];
let working = false;
listener();
function listener() {
    exports.connection.onLogs(raydium_sdk_1.MAINNET_PROGRAM_ID.AmmV4, (txLogs) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (seenTx.includes(txLogs.signature)) {
                return;
            }
            seenTx.push(txLogs.signature);
            if (!findLogEntry("init_pc_amount", txLogs.logs)) {
                return;
            }
            if (working) {
                return;
            }
            working = true;
            console.log("Pool initialization detected. Fetching pool keys...");
            const poolKeys = yield (0, poolKeys_1.getPoolKeys)(txLogs.signature);
            if (!poolKeys) {
                working = false;
                return;
            }
            const baseSol = poolKeys.baseMint.equals(raydium_sdk_1.Token.WSOL.mint);
            if (!checkToken(poolKeys, baseSol)) {
                console.log("Pool does not match our criteria. Skipping...");
                working = false;
                return;
            }
            yield (0, snipe_1.snipe)(poolKeys, baseSol);
            working = false;
        }
        catch (error) {
            console.error(error);
            working = false;
        }
    }));
}
function findLogEntry(target, logEntries) {
    return logEntries.find(entry => entry.includes(target));
}
function checkTokenAuthority(poolKeys) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accountInfo = yield exports.connection.getAccountInfo(poolKeys.baseMint);
            if (!(accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.data)) {
                console.log("Could not get token info.");
                return false;
            }
            const deserialize = spl_token_1.MintLayout.decode(accountInfo.data);
            const renounced = deserialize.mintAuthorityOption === 0;
            const freeze = deserialize.freezeAuthorityOption === 0;
            if (renounced && freeze) {
                console.log("Token passed checks.");
                return true;
            }
            console.log("Token is not renounced or has freeze authority");
            return false;
        }
        catch (error) {
            console.error("Failed to check token.");
            return false;
        }
    });
}
function getTokenMetadata(mintAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const metaplex = js_1.Metaplex.make(exports.connection);
        try {
            const nft = yield metaplex.nfts().findByMint({ mintAddress });
            const tokenUri = nft.uri;
            return tokenUri;
        }
        catch (error) {
            console.error("Error retrieving token metadata:", error);
            return null;
        }
    });
}
function fetchSocialMediaInfo(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            const contentType = response.headers["content-type"];
            if (!contentType.includes("application/json") && !contentType.includes("text/plain")) {
                console.warn("Unexpected content type:", contentType);
                return null;
            }
            const jsonData = response.data;
            return jsonData;
        }
        catch (error) {
            console.error("Error fetching social media info:", error);
            return null;
        }
    });
}
function hasSocialMediaOrWebsite(metadata) {
    if (metadata.extensions) {
        const extensions = metadata.extensions;
        if (extensions.telegram || extensions.twitter || extensions.discord || extensions.website) {
            return true;
        }
    }
    if (metadata.creator && metadata.creator.site) {
        return true;
    }
    return false;
}
function checkWebsiteOrSocialMedia(mint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenUri = yield getTokenMetadata(mint);
            if (tokenUri) {
                const socialMediaInfo = yield fetchSocialMediaInfo(tokenUri);
                if (socialMediaInfo) {
                    return hasSocialMediaOrWebsite(socialMediaInfo);
                }
            }
            return false;
        }
        catch (error) {
            console.error("Error checking website or social media for token:", error);
            return false;
        }
    });
}
exports.checkWebsiteOrSocialMedia = checkWebsiteOrSocialMedia;
function checkToken(poolKeys, baseSol) {
    return __awaiter(this, void 0, void 0, function* () {
        const quoteSol = poolKeys.quoteMint.equals(raydium_sdk_1.Token.WSOL.mint);
        if (config_1.TOKEN_TO_SNIPE) {
            const baseTarget = poolKeys.baseMint.equals(new web3_js_1.PublicKey(config_1.TOKEN_TO_SNIPE));
            const quoteTarget = poolKeys.quoteMint.equals(new web3_js_1.PublicKey(config_1.TOKEN_TO_SNIPE));
            return (baseTarget && quoteSol) || (quoteTarget && baseSol);
        }
        else {
            if (!(yield checkTokenAuthority(poolKeys))) {
                console.log(`bad token authority: ${poolKeys.baseMint.toBase58()}`);
                return false;
            }
            if (!(yield checkWebsiteOrSocialMedia(baseSol ? poolKeys.quoteMint : poolKeys.baseMint))) {
                console.log(`bad token authority: ${poolKeys.baseMint.toBase58()}`);
                return false;
            }
            return (baseSol && !quoteSol) || (quoteSol && !baseSol);
        }
    });
}
function trackPrice(poolKeys, baseSol) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = new raydium_sdk_1.Token(raydium_sdk_1.TOKEN_PROGRAM_ID, baseSol ? poolKeys.quoteMint : poolKeys.baseMint, baseSol ? poolKeys.quoteDecimals : poolKeys.baseDecimals);
        while (true) {
            const poolInfo = yield raydium_sdk_1.Liquidity.fetchInfo({ connection: exports.connection, poolKeys });
            const computedAmountOut = raydium_sdk_1.Liquidity.computeAmountOut({
                poolKeys,
                poolInfo,
                amountIn: new raydium_sdk_1.TokenAmount(raydium_sdk_1.Token.WSOL, 1, false),
                currencyOut: token,
                slippage: new raydium_sdk_1.Percent(0, 100),
            });
            const price = 1 / Number(computedAmountOut.amountOut.toExact());
            console.log(price);
            yield new Promise((resolve) => setTimeout(resolve, 5000));
        }
    });
}
function getTokenSupply(mint) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountInfo = yield exports.connection.getAccountInfo(mint);
        if (!(accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.data)) {
            return null;
        }
        const deserialize = spl_token_1.MintLayout.decode(accountInfo.data);
        return deserialize.supply;
    });
}
