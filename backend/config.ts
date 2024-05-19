import dotenv from "dotenv";

dotenv.config();

export const RPC_URL = process.env["RPC_URL"] as string;
export const WS_URL = process.env["WS_URL"] as string;

export const PRIV_KEY = process.env["PRIV_KEY"] as string;
export const JITO_KEY = process.env["JITO_KEY"] as string;

export const JITO_BLOCK_URL = process.env["JITO_BLOCK_URL"] as string;

export const TOKEN_TO_SNIPE = process.env["TOKEN_TO_SNIPE"] as string;

export const SNIPE_AMOUNT = Number(process.env["SNIPE_AMOUNT"]);
export const SLIPPAGE = Number(process.env["SLIPPAGE"]);
export const JITO_FEE = Number(process.env["JITO_FEE"]);