import { body } from "express-validator";
import { validate } from "./validation.middleware";

export const createPostValidation = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters long if provided"),
    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long"),
    validate,
];
