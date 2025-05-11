import { Router } from "express";
import {
  deleteFamilyHandler,
  getAllFamiliesHandler,
  updateFamilyController,
  updateInviteSentHandler
} from "../../controllers/familyController";

const familyRoutes = Router();

// ROTAS PRIVADAS
familyRoutes.delete("/:id", deleteFamilyHandler);
familyRoutes.get("/", getAllFamiliesHandler);
familyRoutes.patch("/:id/invite", updateInviteSentHandler);
familyRoutes.patch("/:id", updateFamilyController);

export { familyRoutes };
