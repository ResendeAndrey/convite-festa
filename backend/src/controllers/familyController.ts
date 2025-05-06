import { Request, Response } from "express";
import { getErrorMessage } from "../helpers/errorMessage";
import { prisma } from "../prisma";
import {
  deleteFamilyService,
  getAllFamilyService,
  getFamilyByIdService
} from "../services/familyService";

export const deleteFamilyHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteFamilyService({ familyId: id });
    return res.json(result);
  } catch (error) {
    const errorHandler = getErrorMessage(error);
    console.error(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};

export const getAllFamiliesHandler = async (req: Request, res: Response) => {
  try {
    const families = await getAllFamilyService(req.query);
    return res.json(families);
  } catch (error) {
    const errorHandler = getErrorMessage(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};

export const getFamilyByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const family = await getFamilyByIdService({ familyId: id });
    return res.json(family);
  } catch (error) {
    const errorHandler = getErrorMessage(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};

export const confirmFamilyGuestsHandler = async (
  req: Request<{ id: string }, {}, { guestsIds: string[] }>,
  res: Response
) => {
  const { id } = req.params;
  const family = await getFamilyByIdService({ familyId: id });
  const { guestsIds } = req.body;
  console.log(guestsIds);
  try {
    let updatedGuests;
    if (!guestsIds)
      return res.status(400).json({ message: "No guest ids provided." });

    if (guestsIds) {
      updatedGuests = await Promise.all(
        guestsIds.map((guestId) =>
          prisma.guest.update({
            where: { id: guestId },
            data: { confirmed: true }
          })
        )
      );
      const confirmedNames = updatedGuests
        .map((guest) => guest.name)
        .join(", ");
      return res.status(200).json({
        family: family?.name,
        guestsConfirmed: confirmedNames
      });
    }
  } catch (error) {
    const errorHandler = getErrorMessage(error);
    return res
      .status(errorHandler.status)
      .json({ message: errorHandler.message });
  }
};
