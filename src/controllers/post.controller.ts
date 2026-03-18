import { Request, Response } from "express";
import { createPostService, getPostsService } from "../services/post.service";

export const createPost = async (req: any, res: Response) => {
  try {
    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ message: "Missing required fields: title and content" });
    }

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

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await getPostsService();
    res.json(posts);
  } catch (error: any) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: error.message || "Failed to fetch posts" });
  }
};