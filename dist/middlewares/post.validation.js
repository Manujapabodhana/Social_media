"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidation = exports.postIdValidation = exports.createPostValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("./validation.middleware");
exports.createPostValidation = [
    (0, express_validator_1.body)("title")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters long if provided"),
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("Content is required")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long"),
    validation_middleware_1.validate,
];
exports.postIdValidation = [
    (0, express_validator_1.param)("id")
        .isInt({ min: 1 })
        .withMessage("Post id must be a positive integer"),
    validation_middleware_1.validate,
];
exports.updatePostValidation = [
    (0, express_validator_1.body)("title")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters long if provided"),
    (0, express_validator_1.body)("content")
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long if provided"),
    (0, express_validator_1.body)()
        .custom((value) => {
        if (value.title === undefined && value.content === undefined) {
            throw new Error("At least one of title or content is required");
        }
        return true;
    }),
    validation_middleware_1.validate,
];
