"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Post_1 = require("../entities/Post");
const Comment_1 = require("../entities/Comment");
const Like_1 = require("../entities/Like");
const Share_1 = require("../entities/Share");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [User_1.User, Post_1.Post, Comment_1.Comment, Like_1.Like, Share_1.Share],
});
