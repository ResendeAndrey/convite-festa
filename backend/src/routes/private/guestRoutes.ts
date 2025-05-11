import { Router } from "express";
import {
  createGuestHandler,
  deleteGuestHandler,
  getGuestsHandler,
  updateGuest
} from "../../controllers/guestController";

const guestRoutes = Router();

// ROTAS PRIVADAS
guestRoutes.post("/", createGuestHandler);
guestRoutes.get("/", getGuestsHandler);
guestRoutes.delete("/:id", deleteGuestHandler);
guestRoutes.patch("/:id", updateGuest);

export { guestRoutes };
