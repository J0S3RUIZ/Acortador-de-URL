import { Router } from "express";

import { login, register, logout, getMe } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { validateRegister, validateLogin } from "../middleware/dataValidator.js";

const router = Router();

router.post("/login", validateLogin, login);

router.post("/register", validateRegister, register);

router.post("/logout", logout);

router.get("/getMe", verifyToken, getMe);

export default router;
