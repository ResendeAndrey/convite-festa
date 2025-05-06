import bcrypt from "bcryptjs"; // Importando o bcrypt para comparar senhas
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { prisma } from "../prisma"; // Supondo que o prisma está configurado no lib

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha obrigatórios" });
  }
  try {
    // Encontre o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Verifique a senha com bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, authConfig.secret!, {
      expiresIn: "1d"
    });

    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
