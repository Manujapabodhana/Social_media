"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsService = exports.createPostService = void 0;
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
