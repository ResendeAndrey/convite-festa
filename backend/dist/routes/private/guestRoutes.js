"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestRoutes = void 0;
const express_1 = require("express");
const guestController_1 = require("../../controllers/guestController");
const guestRoutes = (0, express_1.Router)();
exports.guestRoutes = guestRoutes;
// ROTAS PRIVADAS
guestRoutes.post("/", guestController_1.createGuestHandler);
guestRoutes.get("/", guestController_1.getGuestsHandler);
guestRoutes.delete("/:id", guestController_1.deleteGuestHandler);
