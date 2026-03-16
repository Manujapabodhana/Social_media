"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await (0, auth_service_1.registerUser)(name, email, password);
    const token = (0, jwt_1.generateToken)(user.id);
    res.json({ user, token });
};
exports.register = register;
