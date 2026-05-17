import { Router } from "express";
import {
  createFamilyHandler,
  deleteFamilyHandler,
  getAllFamiliesHandler,
  updateFamilyController,
  updateInviteSentHandler
} from "../../controllers/familyController";

const familyRoutes = Router();

// ROTAS PRIVADAS
familyRoutes.post("/", createFamilyHandler);
familyRoutes.delete("/:id", deleteFamilyHandler);
familyRoutes.get("/", getAllFamiliesHandler);
familyRoutes.patch("/:id/invite", updateInviteSentHandler);
familyRoutes.patch("/:id", updateFamilyController);

export { familyRoutes };
