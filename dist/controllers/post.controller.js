"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.createPost = void 0;
const post_service_1 = require("../services/post.service");
const createPost = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: "Missing required fields: title and content" });
        }
        const post = await (0, post_service_1.createPostService)(req.user.id, req.body.title, req.body.content);
        res.status(201).json({ message: "Post created successfully", post });
    }
    catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ message: error.message || "Failed to create post" });
    }
};
exports.createPost = createPost;
const getPosts = async (_req, res) => {
    try {
        const posts = await (0, post_service_1.getPostsService)();
        res.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: error.message || "Failed to fetch posts" });
    }
};
exports.getPosts = getPosts;
