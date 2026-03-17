"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharePost = exports.likePost = exports.getPosts = exports.createPost = void 0;
const post_service_1 = require("../services/post.service");
const createPost = async (req, res) => {
    const post = await (0, post_service_1.createPostService)(req.user.id, req.body.content);
    res.json(post);
};
exports.createPost = createPost;
const getPosts = async (_req, res) => {
    const posts = await (0, post_service_1.getAllPostsService)();
    res.json(posts);
};
exports.getPosts = getPosts;
const likePost = async (req, res) => {
    const like = await (0, post_service_1.likePostService)(req.user.id, Number(req.params.postId));
    res.json(like);
};
exports.likePost = likePost;
const sharePost = async (req, res) => {
    const share = await (0, post_service_1.sharePostService)(req.user.id, Number(req.params.postId));
    res.json(share);
};
exports.sharePost = sharePost;
