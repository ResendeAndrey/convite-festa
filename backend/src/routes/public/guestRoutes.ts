import { Router } from "express";
import {
  confirmGuestPresenceHandler,
  updateGuestName
} from "../../controllers/guestController";

const guestPublicRoutes = Router();

// ROTA PÚBLICA
guestPublicRoutes.patch("/:id/confirm", confirmGuestPresenceHandler);
guestPublicRoutes.patch("/:id", updateGuestName);

export { guestPublicRoutes };
