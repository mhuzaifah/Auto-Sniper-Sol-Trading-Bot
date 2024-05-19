import { Connection, Logs, PublicKey } from "@solana/web3.js";
import { RPC_URL, TOKEN_TO_SNIPE, WS_URL } from "./config";
import { Liquidity, LiquidityPoolKeysV4, MAINNET_PROGRAM_ID, Percent, TOKEN_PROGRAM_ID, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { getPoolKeys } from "./poolKeys";
import { snipe } from "./snipe";
import { MintLayout } from "@solana/spl-token";
import axios from "axios";
import { Metaplex } from "@metaplex-foundation/js";

export const connection = new Connection(RPC_URL, { wsEndpoint: WS_URL, commitment: "confirmed" });
const seenTx: string[] = [];


listener();

function listener(): void {
    connection.onLogs(MAINNET_PROGRAM_ID.AmmV4, async (txLogs: Logs) => {
        try {
            if (seenTx.includes(txLogs.signature)) {
                return;
            }

            seenTx.push(txLogs.signature);

            if (!findLogEntry("init_pc_amount", txLogs.logs)) {
                return;
            }

            console.log("Pool initialization detected. Fetching pool keys...");
            const poolKeys = await getPoolKeys(txLogs.signature);
            if (!poolKeys) {
                return;
            }

            const baseSol = poolKeys.baseMint.equals(Token.WSOL.mint);

            if (!checkToken(poolKeys, baseSol)) {
                console.log(`Pool does not match our criteria. Skipping...`);
                return;
            }

            console.log(`Attempting to snipe. Token contract address: ${baseSol ? poolKeys.quoteMint.toBase58() : poolKeys.baseMint.toBase58()}`);

            await snipe(poolKeys, baseSol);
        } catch (error) {
            console.error(`Encountered error: ${error}`);
        }
    });
}

function findLogEntry(target: string, logEntries: string[]): string | undefined {
    return logEntries.find(entry => entry.includes(target));
}

async function checkTokenAuthority(poolKeys: LiquidityPoolKeysV4) {
    try {
        const accountInfo = await connection.getAccountInfo(poolKeys.baseMint);
        if (!accountInfo?.data) {
            console.log("Could not get token info.");
            return false;
        }

        const deserialize = MintLayout.decode(accountInfo.data);
        const renounced = deserialize.mintAuthorityOption === 0;
        const freeze = deserialize.freezeAuthorityOption === 0;

        if (renounced && freeze) {
            console.log("Token passed checks.");
            return true;
        }

        console.log("Token is not renounced or has freeze authority");
        return false;
    } catch (error) {
        console.error("Failed to check token.");
        return false;
    }
}



async function getTokenMetadata(mintAddress: PublicKey) {
    const metaplex = Metaplex.make(connection);

    try {
        const nft = await metaplex.nfts().findByMint({ mintAddress });
        const tokenUri = nft.uri;
        return tokenUri;
    } catch (error) {
        console.error("Error retrieving token metadata:", error);
        return null;
    }
}

async function fetchSocialMediaInfo(url: string) {
    try {
        const response = await axios.get(url);
        const contentType = response.headers["content-type"];

        if (!contentType.includes("application/json") && !contentType.includes("text/plain")) {
            console.warn("Unexpected content type:", contentType);
            return null;
        }

        const jsonData = response.data;
        return jsonData;
    } catch (error) {
        console.error("Error fetching social media info:", error);
        return null;
    }
}

function hasSocialMediaOrWebsite(metadata: any) {
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

export async function checkWebsiteOrSocialMedia(mint: PublicKey): Promise<boolean> {
    try {
        const tokenUri = await getTokenMetadata(mint);
        if (tokenUri) {
            const socialMediaInfo = await fetchSocialMediaInfo(tokenUri);
            if (socialMediaInfo) {
                return hasSocialMediaOrWebsite(socialMediaInfo);
            }
        }
        return false;
    } catch (error) {
        console.error("Error checking website or social media for token:", error);
        return false;
    }
}

async function checkToken(poolKeys: LiquidityPoolKeysV4, baseSol: boolean) {
    const quoteSol = poolKeys.quoteMint.equals(Token.WSOL.mint);
    if (TOKEN_TO_SNIPE) {
        const baseTarget = poolKeys.baseMint.equals(new PublicKey(TOKEN_TO_SNIPE));
        const quoteTarget = poolKeys.quoteMint.equals(new PublicKey(TOKEN_TO_SNIPE));
        return (baseTarget && quoteSol) || (quoteTarget && baseSol);
    } else {
        if (!(await checkTokenAuthority(poolKeys))) {
            console.log(`bad token authority: ${poolKeys.baseMint.toBase58()}`);
            return false;
        }
        if (!(await checkWebsiteOrSocialMedia(baseSol ? poolKeys.quoteMint : poolKeys.baseMint))) {
            console.log(`bad token authority: ${poolKeys.baseMint.toBase58()}`);
            return false;
        }
        return (baseSol && !quoteSol) || (quoteSol && !baseSol);
    }
}

async function trackPrice(poolKeys: LiquidityPoolKeysV4, baseSol: boolean) {
    const token = new Token(TOKEN_PROGRAM_ID, baseSol ? poolKeys.quoteMint : poolKeys.baseMint, baseSol ? poolKeys.quoteDecimals : poolKeys.baseDecimals);
    while (true) {
        const poolInfo = await Liquidity.fetchInfo({ connection, poolKeys });

        const computedAmountOut = Liquidity.computeAmountOut({
            poolKeys,
            poolInfo,
            amountIn: new TokenAmount(Token.WSOL, 1, false),
            currencyOut: token,
            slippage: new Percent(0, 100),
        });
        const price = 1 / Number(computedAmountOut.amountOut.toExact());
        console.log(price);

        await new Promise((resolve) => setTimeout(resolve, 5000));
    }
}

async function getTokenSupply(mint: PublicKey): Promise<bigint | null> {
    const accountInfo = await connection.getAccountInfo(mint)
    if (!accountInfo?.data) {
        return null;
    }
    const deserialize = MintLayout.decode(accountInfo.data);
    return deserialize.supply
}