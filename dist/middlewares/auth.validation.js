"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("./validation.middleware");
exports.registerValidation = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Must be a valid email address")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    validation_middleware_1.validate,
];
exports.loginValidation = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Must be a valid email address")
        .normalizeEmail(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    validation_middleware_1.validate,
];
