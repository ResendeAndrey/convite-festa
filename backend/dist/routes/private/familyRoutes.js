"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.familyRoutes = void 0;
const express_1 = require("express");
const familyController_1 = require("../../controllers/familyController");
const familyRoutes = (0, express_1.Router)();
exports.familyRoutes = familyRoutes;
// ROTAS PRIVADAS
familyRoutes.delete("/:id", familyController_1.deleteFamilyHandler);
familyRoutes.get("/", familyController_1.getAllFamiliesHandler);
familyRoutes.patch("/:id/invite", familyController_1.updateInviteSentHandler);
