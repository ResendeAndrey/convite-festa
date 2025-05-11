import { z } from "zod";

export const guestFormSchema = z.object({
  name: z.string().optional(),
  phone: z
    .string({ message: "Telefone deve conter 10 dígitos" })
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }) // Validando no mínimo 10 dígitos
    .refine((val) => val.replace(/\D/g, "").length >= 10, {
      message: "Telefone inválido"
    })
});

export type GuestFormData = z.infer<typeof guestFormSchema>;
