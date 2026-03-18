import express from "express";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

const app = express();
const API_PREFIX = "/api/v1";

// Middleware
app.use(express.json());

// Health check endpoint
app.get(`${API_PREFIX}/health`, (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/posts`, postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;