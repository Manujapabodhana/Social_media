"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_EXPIRY = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
