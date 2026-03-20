import { Request, Response } from "express";
import {
  createPostService,
  getPostsService,
  updatePostService,
  deletePostService,
} from "../services/post.service";

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
// @desc    Get all posts with pagination, search, and filters
// @access  Public
export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const search = req.query.search ? String(req.query.search) : undefined;
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const title = req.query.title ? String(req.query.title) : undefined;

    const result = await getPostsService({
      page,
      limit,
      search,
      userId,
      title,
    });
    res.json(result);
  } catch (error: any) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: error.message || "Failed to fetch posts" });
  }
};

// @route   PUT /api/v1/posts/:id
// @desc    Update a post
// @access  Private (owner only)
export const updatePost = async (req: any, res: Response) => {
  try {
    const postId = Number(req.params.id);
    const { title, content } = req.body;

    const post = await updatePostService(postId, req.user.id, title, content);

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error: any) {
    console.error("Error updating post:", error.message);

    if (error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Not authorized to update this post") {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || "Failed to update post" });
  }
};

// @route   DELETE /api/v1/posts/:id
// @desc    Delete a post
// @access  Private (owner only)
export const deletePost = async (req: any, res: Response) => {
  try {
    const postId = Number(req.params.id);

    await deletePostService(postId, req.user.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting post:", error.message);

    if (error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Not authorized to delete this post") {
      return res.status(403).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || "Failed to delete post" });
  }
};