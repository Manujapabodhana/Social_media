"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const userRepo = database_1.AppDataSource.getRepository(User_1.User);
// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await (0, auth_service_1.registerUser)(name, email, password);
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        // Store refresh token in database
        user.refreshToken = refreshToken;
        await userRepo.save(user);
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({
            message: "User registered successfully",
            user: userWithoutPassword,
            accessToken,
            refreshToken
        });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: error.message || "Registration failed" });
    }
};
exports.register = register;
// @route   POST /api/v1/auth/login
// @desc    Login user and generate tokens
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.loginUser)(email, password);
        const accessToken = (0, jwt_1.generateAccessToken)(user.id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        // Update refresh token in database
        user.refreshToken = refreshToken;
        await userRepo.save(user);
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
            accessToken,
            refreshToken
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(401).json({ message: error.message || "Login failed" });
    }
};
exports.login = login;
// @route   POST /api/v1/auth/refresh
// @desc    Refresh access token
// @access  Private
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }
        const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
        const decoded = (0, jwt_1.verifyToken)(refreshToken, secret);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }
        const user = await userRepo.findOneBy({ id: decoded.id });
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = (0, jwt_1.generateAccessToken)(user.id);
        const newRefreshToken = (0, jwt_1.generateRefreshToken)(user.id);
        // Update refresh token for security/rotation
        user.refreshToken = newRefreshToken;
        await userRepo.save(user);
        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    }
    catch (error) {
        console.error("Refresh error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.refresh = refresh;
