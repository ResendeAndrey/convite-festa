import { Router } from "express";
import {
  confirmFamilyGuestsHandler,
  getFamilyByIdHandler
} from "../../controllers/familyController";

const familyPublicRoutes = Router();

// ROTA PÚBLICA
familyPublicRoutes.patch("/:id/confirm", confirmFamilyGuestsHandler);
familyPublicRoutes.get("/:id", getFamilyByIdHandler);

export { familyPublicRoutes };
