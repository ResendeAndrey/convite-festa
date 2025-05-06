import "dotenv/config";
import express from "express";
import { authenticate } from "./middlewares/auth";
import { authRoutes } from "./routes/authRoutes";
import { familyRoutes } from "./routes/private/familyRoutes";
import { guestRoutes } from "./routes/private/guestRoutes";
import { familyPublicRoutes } from "./routes/public/familyRoutes";
import { guestPublicRoutes } from "./routes/public/guestRoutes";
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas públicas
app.use("/api/auth", authRoutes);
app.use("/api/guests/", guestPublicRoutes);
app.use("/api/families/", familyPublicRoutes);

// Rotas privadas (protegidas por middleware)
app.use("/api/guests", authenticate, guestRoutes);
app.use("/api/families", authenticate, familyRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
