"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const app = (0, express_1.default)();
const API_PREFIX = "/api/v1";
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:3001", // Allow frontend on port 3001
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express_1.default.json());
// Health check endpoint
app.get(`${API_PREFIX}/health`, (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// Routes
app.use(`${API_PREFIX}/auth`, auth_routes_1.default);
app.use(`${API_PREFIX}/posts`, post_routes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = app;
