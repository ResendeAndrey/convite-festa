import { Router } from "express";
import { loginHandler } from "../controllers/authController";

const authRoutes = Router();

// Rota de login
authRoutes.post("/login", loginHandler);

export { authRoutes };
