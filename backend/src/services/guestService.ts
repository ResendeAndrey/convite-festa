import { Prisma } from "@prisma/client";
import { formatPhoneRaw } from "../helpers/phone";
import { prisma } from "../prisma"; // Importar a instância do Prisma
import {
  deleteFamilyService,
  getFamilyByIdService,
  updateFamilyService
} from "./familyService";

export const createGuestService = async ({
  name,
  phone,
  familyId,
  withoutName
}: GuestData) => {
  const guest = await prisma.guest.create({
    data: {
      name,
      phone: formatPhoneRaw(phone),
      familyId,
      withoutName
    }
  });

  return guest;
};

export const getGuestsService = async (params: GuestGetAllParams) => {
  const {
    orderBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 30,
    familyId,
    confirmed,
    search
  } = params;
  const where: Prisma.GuestWhereInput = {};

  if (familyId) where["familyId"] = familyId;
  if (confirmed === "true") where["confirmed"] = true;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } }
    ];
  }

  const guests = await prisma.guest.findMany({
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

  const count = await prisma.guest.count({
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
};

export const getGuestByIdService = async ({ guestId }: { guestId: string }) => {
  const guest = await prisma.guest.findUnique({
    where: { id: guestId }
  });
  return guest;
};
export const deleteGuestService = async ({ guestId }: { guestId: string }) => {
  const guest = await getGuestByIdService({ guestId });

  if (!guest) {
    throw new Error("Convidado não encontrado");
  }
  const familyId = guest.familyId;

  if (familyId) {
    const family = await getFamilyByIdService({ familyId });
    if (family && family.totalGuests && family.totalGuests > 1) {
      await prisma.guest.delete({
        where: { id: guestId }
      });

      await updateFamilyService({
        familyId: family.id as string,
        totalGuests: family.totalGuests - 1
      });
    } else {
      await deleteFamilyService({ familyId });
    }
  }

  return {
    message: `Convidado ${guest.name} removido com sucesso`
  };
};

export const updateGuestService = async ({
  data,
  id
}: {
  data: Partial<GuestData>;
  id: string;
}) => {
  const { name, phone, confirmed, withoutName } = data;
  const guest = await prisma.guest.update({
    where: { id },
    data: { name, phone, confirmed, withoutName }
  });
  return guest;
};
