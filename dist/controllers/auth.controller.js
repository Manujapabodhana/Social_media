"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = await (0, auth_service_1.registerUser)(name, email, password);
        const token = (0, jwt_1.generateToken)(user.id);
        res.status(201).json({ message: "User registered successfully", user, token });
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
        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = await (0, auth_service_1.loginUser)(email, password);
        const token = (0, jwt_1.generateToken)(user.id);
        res.status(200).json({ message: "Login successful", user, token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(401).json({ message: error.message || "Login failed" });
    }
};
exports.login = login;
