"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAccessTokenSecret = () => {
    return process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
};
const getRefreshTokenSecret = () => {
    return process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
};
const generateAccessToken = (userId) => {
    const accessTokenExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN ||
        "15m";
    return jsonwebtoken_1.default.sign({ id: userId }, getAccessTokenSecret(), { expiresIn: accessTokenExpiresIn });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    const refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN ||
        "7d";
    return jsonwebtoken_1.default.sign({ id: userId }, getRefreshTokenSecret(), { expiresIn: refreshTokenExpiresIn });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, getRefreshTokenSecret());
};
exports.verifyRefreshToken = verifyRefreshToken;
exports.generateToken = exports.generateAccessToken;
