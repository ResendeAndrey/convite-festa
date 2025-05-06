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
exports.updateGuestService = exports.deleteGuestService = exports.getGuestByIdService = exports.getGuestsService = exports.createGuestService = void 0;
const phone_1 = require("../helpers/phone");
const prisma_1 = require("../prisma"); // Importar a instância do Prisma
const familyService_1 = require("./familyService");
const createGuestService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, phone, familyId, withoutName }) {
    const guest = yield prisma_1.prisma.guest.create({
        data: {
            name,
            phone: (0, phone_1.formatPhoneRaw)(phone),
            familyId,
            withoutName
        }
    });
    return guest;
});
exports.createGuestService = createGuestService;
const getGuestsService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderBy = "createdAt", order = "desc", page = 1, limit = 30, familyId, confirmed, search } = params;
    const where = {};
    if (familyId)
        where["familyId"] = familyId;
    if (confirmed === "true")
        where["confirmed"] = true;
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } }
        ];
    }
    const guests = yield prisma_1.prisma.guest.findMany({
        where,
        include: {
            family: true
        },
        take: Number(limit),
        orderBy: {
            [orderBy]: order
        },
        skip: (page - 1) * limit
    });
    const count = yield prisma_1.prisma.guest.count({
        where
    });
    const totalPages = Math.ceil(count / limit);
    return {
        data: guests,
        count,
        page: Number(page),
        limit: Number(limit),
        totalPages
    };
});
exports.getGuestsService = getGuestsService;
const getGuestByIdService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ guestId }) {
    const guest = yield prisma_1.prisma.guest.findUnique({
        where: { id: guestId }
    });
    return guest;
});
exports.getGuestByIdService = getGuestByIdService;
const deleteGuestService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ guestId }) {
    const guest = yield (0, exports.getGuestByIdService)({ guestId });
    if (!guest) {
        throw new Error("Convidado não encontrado");
    }
    const familyId = guest.familyId;
    if (familyId) {
        const family = yield (0, familyService_1.getFamilyByIdService)({ familyId });
        if (family && family.totalGuests && family.totalGuests > 1) {
            yield prisma_1.prisma.guest.delete({
                where: { id: guestId }
            });
            yield (0, familyService_1.updateFamilyService)({
                familyId: family.id,
                totalGuests: family.totalGuests - 1
            });
        }
        else {
            yield (0, familyService_1.deleteFamilyService)({ familyId });
        }
    }
    return {
        message: `Convidado ${guest.name} removido com sucesso`
    };
});
exports.deleteGuestService = deleteGuestService;
const updateGuestService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ data, id }) {
    const { name, phone, confirmed, withoutName } = data;
    const guest = yield prisma_1.prisma.guest.update({
        where: { id },
        data: { name, phone, confirmed, withoutName }
    });
    return guest;
});
exports.updateGuestService = updateGuestService;
