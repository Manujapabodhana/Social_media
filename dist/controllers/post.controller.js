"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPosts = exports.createPost = void 0;
const post_service_1 = require("../services/post.service");
// @route   POST /api/v1/posts
// @desc    Create a new post
// @access  Private
const createPost = async (req, res) => {
    try {
        const post = await (0, post_service_1.createPostService)(req.user.id, req.body.title, req.body.content);
        res.status(201).json({ message: "Post created successfully", post });
    }
    catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ message: error.message || "Failed to create post" });
    }
};
exports.createPost = createPost;
// @route   GET /api/v1/posts
// @desc    Get all posts with pagination, search, and filters
// @access  Public
const getPosts = async (req, res) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const search = req.query.search ? String(req.query.search) : undefined;
        const userId = req.query.userId ? Number(req.query.userId) : undefined;
        const title = req.query.title ? String(req.query.title) : undefined;
        const result = await (0, post_service_1.getPostsService)({
            page,
            limit,
            search,
            userId,
            title,
        });
        res.json(result);
    }
    catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: error.message || "Failed to fetch posts" });
    }
};
exports.getPosts = getPosts;
// @route   PUT /api/v1/posts/:id
// @desc    Update a post
// @access  Private (owner only)
const updatePost = async (req, res) => {
    try {
        const postId = Number(req.params.id);
        const { title, content } = req.body;
        const post = await (0, post_service_1.updatePostService)(postId, req.user.id, title, content);
        res.status(200).json({ message: "Post updated successfully", post });
    }
    catch (error) {
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
exports.updatePost = updatePost;
// @route   DELETE /api/v1/posts/:id
// @desc    Delete a post
// @access  Private (owner only)
const deletePost = async (req, res) => {
    try {
        const postId = Number(req.params.id);
        await (0, post_service_1.deletePostService)(postId, req.user.id);
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
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
exports.deletePost = deletePost;
