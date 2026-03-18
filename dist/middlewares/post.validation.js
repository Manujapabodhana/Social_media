"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidation = void 0;
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
