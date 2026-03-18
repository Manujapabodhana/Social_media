import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createPostValidation } from "../middlewares/post.validation";

const router = Router();

router.post("/", authMiddleware, createPostValidation, createPost);
router.get("/", getPosts);

export default router;