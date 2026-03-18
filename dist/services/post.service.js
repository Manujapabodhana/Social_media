"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostService = exports.updatePostService = exports.getPostsService = exports.createPostService = void 0;
const database_1 = require("../config/database");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const postRepo = database_1.AppDataSource.getRepository(Post_1.Post);
const userRepo = database_1.AppDataSource.getRepository(User_1.User);
const createPostService = async (userId, title, content) => {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
        throw new Error("User not found");
    }
    const post = postRepo.create({
        title,
        content,
        user
    });
    return await postRepo.save(post);
};
exports.createPostService = createPostService;
const getPostsService = async () => {
    return await postRepo.find({
        relations: ["user"],
        order: { id: "DESC" }
    });
};
exports.getPostsService = getPostsService;
const updatePostService = async (postId, userId, title, content) => {
    const post = await postRepo.findOne({
        where: { id: postId },
        relations: ["user"],
    });
    if (!post) {
        throw new Error("Post not found");
    }
    if (!post.user || post.user.id !== userId) {
        throw new Error("Not authorized to update this post");
    }
    if (title !== undefined) {
        post.title = title;
    }
    if (content !== undefined) {
        post.content = content;
    }
    return await postRepo.save(post);
};
exports.updatePostService = updatePostService;
const deletePostService = async (postId, userId) => {
    const post = await postRepo.findOne({
        where: { id: postId },
        relations: ["user"],
    });
    if (!post) {
        throw new Error("Post not found");
    }
    if (!post.user || post.user.id !== userId) {
        throw new Error("Not authorized to delete this post");
    }
    await postRepo.remove(post);
};
exports.deletePostService = deletePostService;
