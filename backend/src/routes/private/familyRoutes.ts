import { Router } from "express";
import {
  deleteFamilyHandler,
  getAllFamiliesHandler
} from "../../controllers/familyController";

const familyRoutes = Router();

// ROTAS PRIVADAS
familyRoutes.delete("/:id", deleteFamilyHandler);
familyRoutes.get("/", getAllFamiliesHandler);

export { familyRoutes };
