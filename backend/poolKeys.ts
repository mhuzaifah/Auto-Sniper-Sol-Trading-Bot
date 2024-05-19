import { AccountInfo, ParsedInnerInstruction, ParsedInstruction, ParsedTransactionWithMeta, PartiallyDecodedInstruction, PublicKey } from "@solana/web3.js";
import { connection } from "./main";
import { LiquidityPoolKeysV4, MAINNET_PROGRAM_ID, MARKET_STATE_LAYOUT_V3, Market, TOKEN_PROGRAM_ID, Token } from "@raydium-io/raydium-sdk";
import { PoolInfo } from "./types";

export async function getPoolKeys(txSignature: string): Promise<LiquidityPoolKeysV4 | null> {
    const tx = await connection.getParsedTransaction(txSignature, { maxSupportedTransactionVersion: 0 });
    if (!tx) {
        return null;
    }

    const poolInfo = parsePoolInfo(tx);
    if (!poolInfo) {
        return null;
    }

    const marketData = await getMarketInfo(poolInfo.marketId);
    if (!marketData) {
        return null;
    }

    const marketInfo = MARKET_STATE_LAYOUT_V3.decode(marketData.data);

    return {
        ...poolInfo,
        marketAuthority: Market.getAssociatedAuthority({ programId: poolInfo.marketProgramId, marketId: poolInfo.marketId }).publicKey,
        marketBaseVault: marketInfo.baseVault,
        marketQuoteVault: marketInfo.quoteVault,
        marketBids: marketInfo.bids,
        marketAsks: marketInfo.asks,
        marketEventQueue: marketInfo.eventQueue,
    } as LiquidityPoolKeysV4;
}

function parsePoolInfo(txData: ParsedTransactionWithMeta): PoolInfo | null {
    const { transaction, meta } = txData;
    const initInstruction = findInstructionByProgram(transaction.message.instructions, MAINNET_PROGRAM_ID.AmmV4);

    if (!initInstruction) {
        return null;
    }

    const [lpMint, baseMint, quoteMint, baseVault, quoteVault] = initInstruction.accounts.slice(7, 12);
    const innerInstructions = meta?.innerInstructions ?? [];

    const lpInitInstruction = findIxTypeByAddress(innerInstructions, lpMint, "initializeMint");
    const lpMintInstruction = findIxTypeByAddress(innerInstructions, lpMint, "mintTo");

    if (!lpInitInstruction || !lpMintInstruction) {
        return null;
    }

    const baseTransferIx = findTransferIxByDestination(innerInstructions, baseVault, TOKEN_PROGRAM_ID);
    const quoteTransferIx = findTransferIxByDestination(innerInstructions, quoteVault, TOKEN_PROGRAM_ID);

    if (!baseTransferIx || !quoteTransferIx) {
        return null;
    }

    const lpDecimals = lpInitInstruction.parsed.info.decimals;
    const basePreBalance = meta?.preTokenBalances?.find((balance) => balance.mint === baseMint.toBase58());

    if (!basePreBalance) {
        return null;
    }

    const baseDecimals = basePreBalance?.uiTokenAmount.decimals;

    const swapBase = baseMint.equals(Token.WSOL.mint);

    return {
        id: initInstruction.accounts[4],
        baseMint,
        quoteMint,
        lpMint,
        baseDecimals: swapBase ? 9 : baseDecimals,
        quoteDecimals: swapBase ? baseDecimals : 9,
        lpDecimals,
        version: 4,
        programId: MAINNET_PROGRAM_ID.AmmV4,
        authority: initInstruction.accounts[5],
        openOrders: initInstruction.accounts[6],
        targetOrders: initInstruction.accounts[13],
        baseVault,
        quoteVault,
        withdrawQueue: new PublicKey("11111111111111111111111111111111"),
        lpVault: new PublicKey(lpMintInstruction.parsed.info.account),
        marketVersion: 3,
        marketProgramId: initInstruction.accounts[15],
        marketId: initInstruction.accounts[16],
    };
}

function findInstructionByProgram(instructions: (PartiallyDecodedInstruction | ParsedInstruction)[], programId: PublicKey): PartiallyDecodedInstruction | null {
    const instruction = instructions.find((instruction) => instruction.programId.equals(programId));
    if (!instruction) {
        return null;
    }

    return instruction as PartiallyDecodedInstruction;
}

function findIxTypeByAddress(innerInstructions: ParsedInnerInstruction[], mintAddress: PublicKey, ixType: string): ParsedInstruction | null {
    for (const innerInstruction of innerInstructions) {
        for (const instruction of innerInstruction.instructions as ParsedInstruction[]) {
            if (!instruction.parsed) continue;

            if (instruction.parsed.type === ixType && instruction.parsed.info.mint === mintAddress.toBase58()) {
                return instruction;
            }
        }
    }

    return null;
}

function findTransferIxByDestination(innerInstructions: ParsedInnerInstruction[], destinationAddress: PublicKey, programId: PublicKey): ParsedInstruction | null {
    for (const innerInstruction of innerInstructions) {
        for (const instruction of innerInstruction.instructions as ParsedInstruction[]) {
            if (!instruction.parsed) continue;

            if (instruction.parsed.type === "transfer" && instruction.parsed.info.destination === destinationAddress.toBase58() && instruction.programId.equals(programId)) {
                return instruction;
            }
        }
    }

    return null;
}

async function getMarketInfo(marketId: PublicKey): Promise<AccountInfo<Buffer> | null> {
    const marketInfo = await connection.getAccountInfo(marketId);
    if (!marketInfo) {
        return null;
    }

    return marketInfo;
}