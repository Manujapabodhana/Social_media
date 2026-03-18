import { Router } from "express";
import { register, login, refresh } from "../controllers/auth.controller";
import { registerValidation, loginValidation } from "../middlewares/auth.validation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/refresh", refresh);

export default router;