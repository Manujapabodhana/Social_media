import express from "express";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

const app = express();


// Middleware
app.use(express.json());

// Health check endpoint
app.get("/v1/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/v1/auth", authRoutes);
app.use("/v1/posts", postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;