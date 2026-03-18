"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await (0, auth_service_1.registerUser)(name, email, password);
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        res.status(201).json({
            message: "User registered successfully",
            user,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: error.message || "Registration failed" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.loginUser)(email, password);
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        res.status(200).json({
            message: "Login successful",
            user,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(401).json({ message: error.message || "Login failed" });
    }
};
exports.login = login;
const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const user = await (0, auth_service_1.findUserById)(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        return res.status(200).json({ accessToken });
    }
    catch (error) {
        console.error("Refresh token error:", error);
        return res.status(401).json({ message: "Invalid or expired refresh token" });
    }
};
exports.refreshAccessToken = refreshAccessToken;
