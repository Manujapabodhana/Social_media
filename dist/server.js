"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = process.env.PORT || 3000;
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Database connection failed:', err.message);
    console.log('Starting server without database connection...');
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (database unavailable)`);
    });
});
