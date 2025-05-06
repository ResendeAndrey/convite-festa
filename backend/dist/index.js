"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_1 = require("./middlewares/auth");
const authRoutes_1 = require("./routes/authRoutes");
const familyRoutes_1 = require("./routes/private/familyRoutes");
const guestRoutes_1 = require("./routes/private/guestRoutes");
const familyRoutes_2 = require("./routes/public/familyRoutes");
const guestRoutes_2 = require("./routes/public/guestRoutes");
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
// Rotas públicas
app.use("/api/auth", authRoutes_1.authRoutes);
app.use("/api/guests/", guestRoutes_2.guestPublicRoutes);
app.use("/api/families/", familyRoutes_2.familyPublicRoutes);
// Rotas privadas (protegidas por middleware)
app.use("/api/guests", auth_1.authenticate, guestRoutes_1.guestRoutes);
app.use("/api/families", auth_1.authenticate, familyRoutes_1.familyRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
