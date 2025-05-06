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
exports.getAllFamilyService = exports.deleteFamilyService = exports.updateFamilyService = exports.getFamilyByIdService = exports.createFamilyService = void 0;
const prisma_1 = require("../prisma");
const createFamilyService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, totalGuests }) {
    const family = yield prisma_1.prisma.family.create({
        data: {
            name,
            totalGuests
        }
    });
    return family;
});
exports.createFamilyService = createFamilyService;
const getFamilyByIdService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ familyId }) {
    if (!familyId)
        return null;
    const family = yield prisma_1.prisma.family.findUnique({
        where: { id: familyId },
        include: {
            guests: true
        }
    });
    if (!family) {
        throw new Error("Familia nao encontrada");
    }
    return Object.assign(Object.assign({}, family), { confirmedGuests: family === null || family === void 0 ? void 0 : family.guests.filter((guest) => guest.confirmed).length });
});
exports.getFamilyByIdService = getFamilyByIdService;
const updateFamilyService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ familyId, totalGuests }) {
    const family = yield prisma_1.prisma.family.update({
        where: { id: familyId },
        data: { totalGuests }
    });
    return family;
});
exports.updateFamilyService = updateFamilyService;
const deleteFamilyService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ familyId }) {
    const family = yield prisma_1.prisma.family.findUnique({
        where: { id: familyId }
    });
    if (!family) {
        throw new Error("Familia não encontrada");
    }
    // Remove todos os convidados da família
    yield prisma_1.prisma.guest.deleteMany({
        where: { familyId }
    });
    // Remove a família
    yield prisma_1.prisma.family.delete({
        where: { id: familyId }
    });
    return { message: "Familia e usuários deletados com sucesso" };
});
exports.deleteFamilyService = deleteFamilyService;
const getAllFamilyService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderBy = "createdAt", order = "desc", page = 1, limit = 30, familyId, search } = params;
    const where = {};
    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive"
        };
    }
    if (familyId)
        where["id"] = familyId;
    const [data, count] = yield Promise.all([
        prisma_1.prisma.family.findMany({
            where,
            orderBy: {
                [orderBy]: order
            },
            skip: (page - 1) * limit,
            take: Number(limit),
            include: {
                guests: true
            }
        }),
        prisma_1.prisma.family.count({ where })
    ]);
    const totalPages = Math.ceil(count / limit);
    const formattedData = data.map((family) => (Object.assign(Object.assign({}, family), { confirmedGuests: family.guests.filter((g) => g.confirmed).length })));
    return {
        data: formattedData,
        count,
        page: Number(page),
        limit: Number(limit),
        totalPages
    };
});
exports.getAllFamilyService = getAllFamilyService;
