import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createPostValidation,
  getPostsQueryValidation,
  postIdValidation,
  updatePostValidation,
} from "../middlewares/post.validation";

const router = Router();

router.post("/", authMiddleware, createPostValidation, createPost);
router.get("/", getPostsQueryValidation, getPosts);
router.put("/:id", authMiddleware, postIdValidation, updatePostValidation, updatePost);
router.delete("/:id", authMiddleware, postIdValidation, deletePost);

export default router;