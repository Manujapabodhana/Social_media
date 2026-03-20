import { body, param, query } from "express-validator";
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

export const postIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Post id must be a positive integer"),
    validate,
];

export const getPostsQueryValidation = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page must be a positive integer"),
    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("limit must be an integer between 1 and 100"),
    query("search")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1 })
        .withMessage("search must be a non-empty string"),
    query("userId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("userId must be a positive integer"),
    query("title")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1 })
        .withMessage("title must be a non-empty string"),
    validate,
];

export const updatePostValidation = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters long if provided"),
    body("content")
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long if provided"),
    body()
        .custom((value) => {
            if (value.title === undefined && value.content === undefined) {
                throw new Error("At least one of title or content is required");
            }
            return true;
        }),
    validate,
];
