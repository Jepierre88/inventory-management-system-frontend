import { z } from "zod";

export const signInSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
  }).min(5, { message: "El nombre de usuario debe tener al menos 5 caracteres" }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }).min(5, { message: "La contraseña debe tener al menos 5 caracteres" }),
})