import { Request, Response } from "express";
import { createPostService, getPostsService } from "../services/post.service";

// @route   POST /api/v1/posts
// @desc    Create a new post
// @access  Private
export const createPost = async (req: any, res: Response) => {
  try {
    const post = await createPostService(
      req.user.id,
      req.body.title,
      req.body.content
    );

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error: any) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: error.message || "Failed to create post" });
  }
};

// @route   GET /api/v1/posts
// @desc    Get all posts
// @access  Public
export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await getPostsService();
    res.json(posts);
  } catch (error: any) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: error.message || "Failed to fetch posts" });
  }
};