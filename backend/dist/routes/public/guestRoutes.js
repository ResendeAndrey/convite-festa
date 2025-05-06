"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestPublicRoutes = void 0;
const express_1 = require("express");
const guestController_1 = require("../../controllers/guestController");
const guestPublicRoutes = (0, express_1.Router)();
exports.guestPublicRoutes = guestPublicRoutes;
// ROTA PÚBLICA
guestPublicRoutes.patch("/:id/confirm", guestController_1.confirmGuestPresenceHandler);
guestPublicRoutes.patch("/:id", guestController_1.updateGuestName);
