"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const userRepo = database_1.AppDataSource.getRepository(User_1.User);
const registerUser = async (name, email, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = userRepo.create({
        name,
        email,
        password: hashedPassword
    });
    return await userRepo.save(user);
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await userRepo.findOneBy({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new Error("Invalid credentials");
    }
    return user;
};
exports.loginUser = loginUser;
const findUserById = async (userId) => {
    return await userRepo.findOneBy({ id: userId });
};
exports.findUserById = findUserById;
