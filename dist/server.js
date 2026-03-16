"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app_1.default.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
})
    .catch((err) => console.log(err));
