"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
// Rota de login
authRoutes.post("/login", authController_1.loginHandler);
