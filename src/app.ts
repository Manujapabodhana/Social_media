import express from "express";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

const app = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;