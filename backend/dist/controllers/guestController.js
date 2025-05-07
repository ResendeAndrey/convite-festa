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
exports.updateGuestName = exports.confirmGuestPresenceHandler = exports.deleteGuestHandler = exports.getGuestsHandler = exports.createGuestHandler = void 0;
const errorMessage_1 = require("../helpers/errorMessage");
const familyService_1 = require("../services/familyService");
const guestService_1 = require("../services/guestService");
const createGuestHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { familyId, guests } = data;
    if (guests.some((g) => (!g.name && !g.withoutName) || !g.phone)) {
        return res
            .status(400)
            .json({ error: "Name and phone are required for all guests" });
    }
    try {
        let family;
        if (familyId) {
            family = yield (0, familyService_1.getFamilyByIdService)({ familyId });
            if (family === null || family === void 0 ? void 0 : family.id) {
                yield (0, familyService_1.updateFamilyService)({
                    familyId: family.id,
                    totalGuests: (family.totalGuests || 0) + guests.length
                });
            }
        }
        if (!family) {
            family = yield (0, familyService_1.createFamilyService)({
                name: `Family ${guests[0].name || guests[0].phone}`,
                totalGuests: guests.length,
                inviteSent: false
            });
        }
        // Cria todos os convidados
        const createdGuests = yield Promise.all(guests.map((guest) => (0, guestService_1.createGuestService)({
            name: guest.name,
            phone: guest.phone,
            familyId: family.id,
            withoutName: guest.withoutName
        })));
        return res.status(201).json({ guests: createdGuests });
    }
    catch (error) {
        console.error(error);
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.createGuestHandler = createGuestHandler;
const getGuestsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { familyId, confirmed, search, order, orderBy, page, limit } = req.query;
    try {
        const guests = yield (0, guestService_1.getGuestsService)({
            familyId,
            confirmed,
            search,
            order,
            orderBy,
            page,
            limit
        });
        return res.status(200).json(guests);
    }
    catch (error) {
        console.error(error);
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.getGuestsHandler = getGuestsHandler;
const deleteGuestHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: guestId } = req.params;
    try {
        const guest = yield (0, guestService_1.deleteGuestService)({ guestId });
        return res.status(200).json(guest);
    }
    catch (error) {
        console.error(error);
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.deleteGuestHandler = deleteGuestHandler;
const confirmGuestPresenceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Buscar o convidado pelo ID
        const guest = yield (0, guestService_1.getGuestByIdService)({ guestId: id });
        if (!guest) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        if (guest.confirmed === true) {
            return res.status(400).json({ error: "Usuário ja confirmado" });
        }
        // Confirmar presença
        const updatedGuest = yield (0, guestService_1.updateGuestService)({
            data: { confirmed: true },
            id
        });
        return res.status(200).json(updatedGuest);
    }
    catch (error) {
        console.error("Error confirming guest presence:", error);
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res.status(errorHandler.status).json(errorHandler.message);
    }
});
exports.confirmGuestPresenceHandler = confirmGuestPresenceHandler;
const updateGuestName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const guest = yield (0, guestService_1.updateGuestService)({
            data: { name, withoutName: false },
            id
        });
        return res.status(200).json(guest);
    }
    catch (error) {
        console.error(error);
        const errorHandler = (0, errorMessage_1.getErrorMessage)(error);
        return res
            .status(errorHandler.status)
            .json({ message: errorHandler.message });
    }
});
exports.updateGuestName = updateGuestName;
