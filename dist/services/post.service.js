"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharePostService = exports.likePostService = exports.getAllPostsService = exports.createPostService = void 0;
const database_1 = require("../config/database");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const Like_1 = require("../entities/Like");
const Share_1 = require("../entities/Share");
const postRepo = database_1.AppDataSource.getRepository(Post_1.Post);
const userRepo = database_1.AppDataSource.getRepository(User_1.User);
const likeRepo = database_1.AppDataSource.getRepository(Like_1.Like);
const shareRepo = database_1.AppDataSource.getRepository(Share_1.Share);
const createPostService = async (userId, content) => {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    const post = postRepo.create({
        content,
        user,
    });
    return await postRepo.save(post);
};
exports.createPostService = createPostService;
const getAllPostsService = async () => {
    return await postRepo.find({
        relations: ['user'],
        order: { id: 'DESC' },
    });
};
exports.getAllPostsService = getAllPostsService;
const likePostService = async (userId, postId) => {
    const user = await userRepo.findOneBy({ id: userId });
    const post = await postRepo.findOneBy({ id: postId });
    if (!user || !post) {
        throw new Error('User or Post not found');
    }
    const like = likeRepo.create({
        user,
        post,
    });
    return await likeRepo.save(like);
};
exports.likePostService = likePostService;
const sharePostService = async (userId, postId) => {
    const user = await userRepo.findOneBy({ id: userId });
    const post = await postRepo.findOneBy({ id: postId });
    if (!user || !post) {
        throw new Error('User or Post not found');
    }
    const share = shareRepo.create({
        user,
        post,
    });
    return await shareRepo.save(share);
};
exports.sharePostService = sharePostService;
