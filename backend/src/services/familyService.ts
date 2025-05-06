import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export const createFamilyService = async ({
  name,
  totalGuests
}: FamilyData) => {
  const family = await prisma.family.create({
    data: {
      name,
      totalGuests
    }
  });
  return family;
};

export const getFamilyByIdService = async ({
  familyId
}: {
  familyId: string | null;
}) => {
  if (!familyId) return null;
  const family = await prisma.family.findUnique({
    where: { id: familyId },
    include: {
      guests: true
    }
  });

  if (!family) {
    throw new Error("Familia nao encontrada");
  }

  return {
    ...family,
    confirmedGuests: family?.guests.filter((guest) => guest.confirmed).length
  };
};

export const updateFamilyService = async ({
  familyId,
  totalGuests
}: {
  familyId: string;
  totalGuests: number;
}) => {
  const family = await prisma.family.update({
    where: { id: familyId },
    data: { totalGuests }
  });
  return family;
};

export const deleteFamilyService = async ({
  familyId
}: {
  familyId: string;
}) => {
  const family = await prisma.family.findUnique({
    where: { id: familyId }
  });

  if (!family) {
    throw new Error("Familia não encontrada");
  }

  // Remove todos os convidados da família
  await prisma.guest.deleteMany({
    where: { familyId }
  });

  // Remove a família
  await prisma.family.delete({
    where: { id: familyId }
  });

  return { message: "Familia e usuários deletados com sucesso" };
};

export const getAllFamilyService = async (params: GetAllFamiliesParams) => {
  const {
    orderBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 30,
    familyId,
    search
  } = params;

  const where: Prisma.FamilyWhereInput = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive"
    };
  }
  if (familyId) where["id"] = familyId;

  const [data, count] = await Promise.all([
    prisma.family.findMany({
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
    prisma.family.count({ where })
  ]);

  const totalPages = Math.ceil(count / limit);

  const formattedData = data.map((family) => ({
    ...family,
    confirmedGuests: family.guests.filter((g) => g.confirmed).length
  }));

  return {
    data: formattedData,
    count,
    page: Number(page),
    limit: Number(limit),
    totalPages
  };
};
