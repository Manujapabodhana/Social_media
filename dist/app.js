"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
// Routes
console.log("Registering auth routes at /auth");
app.use("/auth", auth_routes_1.default);
console.log("Registering post routes at /posts");
app.use("/posts", post_routes_1.default);
console.log("Post routes registered successfully");
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = app;
