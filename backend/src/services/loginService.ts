import { prisma } from "../prisma";

export const findUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};
