"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JITO_FEE = exports.SLIPPAGE = exports.SNIPE_AMOUNT = exports.TOKEN_TO_SNIPE = exports.JITO_BLOCK_URL = exports.JITO_KEY = exports.PRIV_KEY = exports.WS_URL = exports.RPC_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.RPC_URL = process.env["RPC_URL"];
exports.WS_URL = process.env["WS_URL"];
exports.PRIV_KEY = process.env["PRIV_KEY"];
exports.JITO_KEY = process.env["JITO_KEY"];
exports.JITO_BLOCK_URL = process.env["JITO_BLOCK_URL"];
exports.TOKEN_TO_SNIPE = process.env["TOKEN_TO_SNIPE"];
exports.SNIPE_AMOUNT = Number(process.env["SNIPE_AMOUNT"]);
exports.SLIPPAGE = Number(process.env["SLIPPAGE"]);
exports.JITO_FEE = Number(process.env["JITO_FEE"]);
