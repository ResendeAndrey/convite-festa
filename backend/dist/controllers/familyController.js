"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmFamilyGuestsHandler = exports.getFamilyByIdHandler = exports.getAllFamiliesHandler = exports.deleteFamilyHandler = void 0;
const errorMessage_1 = require("../helpers/errorMessage");
const prisma_1 = require("../prisma");
const familyService_1 = require("../services/familyService");
const deleteFamilyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, familyService_1.deleteFamilyService)({ familyId: id });
        return res.json(result);
    }
    catch (error) {
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        console.error(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.deleteFamilyHandler = deleteFamilyHandler;
const getAllFamiliesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const families = yield (0, familyService_1.getAllFamilyService)(req.query);
        return res.json(families);
    }
    catch (error) {
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.getAllFamiliesHandler = getAllFamiliesHandler;
const getFamilyByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const family = yield (0, familyService_1.getFamilyByIdService)({ familyId: id });
        return res.json(family);
    }
    catch (error) {
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.getFamilyByIdHandler = getFamilyByIdHandler;
const confirmFamilyGuestsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const family = yield (0, familyService_1.getFamilyByIdService)({ familyId: id });
    const { guestsIds } = req.body;
    console.log(guestsIds);
    try {
        let updatedGuests;
        if (!guestsIds)
            return res.status(400).json({ message: "No guest ids provided." });
        if (guestsIds) {
            updatedGuests = yield Promise.all(guestsIds.map((guestId) => prisma_1.prisma.guest.update({
                where: { id: guestId },
                data: { confirmed: true }
            })));
            const confirmedNames = updatedGuests
                .map((guest) => guest.name)
                .join(", ");
            return res.status(200).json({
                family: family === null || family === void 0 ? void 0 : family.name,
                guestsConfirmed: confirmedNames
            });
        }
    }
    catch (error) {
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.confirmFamilyGuestsHandler = confirmFamilyGuestsHandler;
