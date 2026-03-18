import { body } from "express-validator";
import { validate } from "./validation.middleware";

export const registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
    body("email")
        .isEmail()
        .withMessage("Must be a valid email address")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    validate,
];

export const loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Must be a valid email address")
        .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    validate,
];
