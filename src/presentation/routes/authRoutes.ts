import express from "express";
import { AuthController } from "../controllers/auth/authController";

const router = express.Router();

const authController = new AuthController();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get('/refresh-token',authController.refreshToken)

export default router;
