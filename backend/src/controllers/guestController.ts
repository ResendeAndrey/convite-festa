import { Request, Response } from "express";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  createFamilyService,
  getFamilyByIdService,
  updateFamilyService
} from "../services/familyService";
import {
  createGuestService,
  deleteGuestService,
  getGuestByIdService,
  getGuestsService,
  updateGuestService
} from "../services/guestService";

export const createGuestHandler = async (
  req: Request<{}, {}, GuestPayload>,
  res: Response
): Promise<Response> => {
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
      family = await getFamilyByIdService({ familyId });

      if (family?.id) {
        await updateFamilyService({
          familyId: family.id,
          totalGuests: (family.totalGuests || 0) + guests.length
        });
      }
    }

    if (!family) {
      family = await createFamilyService({
        name: `Family ${guests[0].name || guests[0].phone}`,
        totalGuests: guests.length
      });
    }

    // Cria todos os convidados
    const createdGuests = await Promise.all(
      guests.map((guest) =>
        createGuestService({
          name: guest.name,
          phone: guest.phone,
          familyId: family.id,
          withoutName: guest.withoutName
        })
      )
    );

    return res.status(201).json({ guests: createdGuests });
  } catch (error) {
    console.error(error);
    const errorHandler = getErrorMessage(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};

export const getGuestsHandler = async (
  req: Request<{}, {}, {}, GuestGetAllParams>,
  res: Response
): Promise<Response> => {
  const { familyId, confirmed, search, order, orderBy, page, limit } =
    req.query;
  try {
    const guests = await getGuestsService({
      familyId,
      confirmed,
      search,
      order,
      orderBy,
      page,
      limit
    });

    return res.status(200).json(guests);
  } catch (error) {
    console.error(error);
    const errorHandler = getErrorMessage(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};

export const deleteGuestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: guestId } = req.params;

  try {
    const guest = await deleteGuestService({ guestId });
    return res.status(200).json(guest);
  } catch (error) {
    console.error(error);
    const errorHandler = getErrorMessage(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};

export const confirmGuestPresenceHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    // Buscar o convidado pelo ID
    const guest = await getGuestByIdService({ guestId: id });

    if (!guest) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    if (guest.confirmed === true) {
      return res.status(400).json({ error: "Usuário ja confirmado" });
    }
    // Confirmar presença
    const updatedGuest = await updateGuestService({
      data: { confirmed: true },
      id
    });

    return res.status(200).json(updatedGuest);
  } catch (error) {
    console.error("Error confirming guest presence:", error);
    const errorHandler = getErrorMessage(error);
    return res.status(errorHandler.status).json(errorHandler.message);
  }
};

export const updateGuestName = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const guest = await updateGuestService({
      data: { name, withoutName: false },
      id
    });
    return res.status(200).json(guest);
  } catch (error) {
    console.error(error);
    const errorHandler = getErrorMessage(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};
