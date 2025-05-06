"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.familyPublicRoutes = void 0;
const express_1 = require("express");
const familyController_1 = require("../../controllers/familyController");
const familyPublicRoutes = (0, express_1.Router)();
exports.familyPublicRoutes = familyPublicRoutes;
// ROTA PÚBLICA
familyPublicRoutes.patch("/:id/confirm", familyController_1.confirmFamilyGuestsHandler);
familyPublicRoutes.get("/:id", familyController_1.getFamilyByIdHandler);
