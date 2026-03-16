"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPostService = exports.addCommentService = void 0;
const database_1 = require("../config/database");
const Comment_1 = require("../entities/Comment");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const commentRepo = database_1.AppDataSource.getRepository(Comment_1.Comment);
const userRepo = database_1.AppDataSource.getRepository(User_1.User);
const postRepo = database_1.AppDataSource.getRepository(Post_1.Post);
const addCommentService = async (userId, postId, text) => {
    const user = await userRepo.findOneBy({ id: userId });
    const post = await postRepo.findOneBy({ id: postId });
    if (!user || !post) {
        throw new Error('User or Post not found');
    }
    const comment = commentRepo.create({
        text,
        user,
        post,
    });
    return await commentRepo.save(comment);
};
exports.addCommentService = addCommentService;
const getCommentsByPostService = async (postId) => {
    return await commentRepo.find({
        where: {
            post: { id: postId },
        },
        relations: ['user', 'post'],
        order: { id: 'DESC' },
    });
};
exports.getCommentsByPostService = getCommentsByPostService;
