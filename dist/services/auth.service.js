"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const repo = database_1.AppDataSource.getRepository(User_1.User);
const registerUser = async (name, email, password) => {
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = repo.create({
        name,
        email,
        password: hashed,
    });
    return repo.save(user);
};
exports.registerUser = registerUser;
