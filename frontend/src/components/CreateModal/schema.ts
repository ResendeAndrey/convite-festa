import { z } from "zod";

export const guestFormSchema = z.object({
  familyId: z.string().nullable(),
  guests: z
    .array(
      z.object({
        name: z.string().optional(),
        withoutName: z.boolean(),
        phone: z
          .string({ message: "Telefone deve conter 10 dígitos" })
          .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }) // Validando no mínimo 10 dígitos
          .refine((val) => val.replace(/\D/g, "").length >= 10, {
            message: "Telefone inválido"
          })
      })
    )
    .min(1, { message: "Adicione pelo menos um convidado" }) // Valida que pelo menos um convidado foi adicionado
});

export type GuestFormData = z.infer<typeof guestFormSchema>;
