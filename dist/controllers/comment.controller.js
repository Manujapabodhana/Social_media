"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.addComment = void 0;
const comment_service_1 = require("../services/comment.service");
const addComment = async (req, res) => {
    const comment = await (0, comment_service_1.addCommentService)(req.user.id, Number(req.params.postId), req.body.text);
    res.json(comment);
};
exports.addComment = addComment;
const getComments = async (req, res) => {
    const comments = await (0, comment_service_1.getCommentsByPostService)(Number(req.params.postId));
    res.json(comments);
};
exports.getComments = getComments;
