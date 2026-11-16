import z from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Минимум 4 символа" })
    .max(20, { message: "Максимум 20 символов" }),
  password: z
    .string()
    .min(4, { message: "Минимум 4 символов" })
    .max(50, { message: "Максимум 50 символов" }),
});

export type TSignInFormData = z.infer<typeof signInSchema>;
