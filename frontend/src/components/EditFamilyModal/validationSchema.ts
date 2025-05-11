import { z } from "zod";

export const familyFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres")
});
