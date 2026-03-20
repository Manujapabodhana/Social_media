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
const getPostsService = async (query = {}) => {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? Math.min(query.limit, 100) : 10;
    const skip = (page - 1) * limit;
    const qb = postRepo
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "user");
    // Search in title and content (case-insensitive)
    if (query.search) {
        qb.andWhere("(LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.content) LIKE LOWER(:search))", {
            search: `%${query.search}%`,
        });
    }
    // Filter by userId
    if (query.userId) {
        qb.andWhere("user.id = :userId", { userId: query.userId });
    }
    // Filter by title
    if (query.title) {
        qb.andWhere("LOWER(post.title) LIKE LOWER(:title)", { title: `%${query.title}%` });
    }
    qb.orderBy("post.createdAt", "DESC");
    qb.skip(skip).take(limit);
    const [posts, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return {
        data: posts,
        pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    };
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
