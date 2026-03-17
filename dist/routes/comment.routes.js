"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/:postId', auth_middleware_1.authMiddleware, comment_controller_1.addComment);
router.get('/:postId', comment_controller_1.getComments);
exports.default = router;
