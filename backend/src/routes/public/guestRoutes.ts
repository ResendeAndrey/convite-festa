import { Router } from "express";
import { confirmGuestPresenceHandler } from "../../controllers/guestController";

const guestPublicRoutes = Router();

// ROTA PÚBLICA
guestPublicRoutes.patch("/:id/confirm", confirmGuestPresenceHandler);

export { guestPublicRoutes };
