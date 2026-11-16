import { z } from "zod";
import { phone_number, email, country, city } from "./common-schemas";

export const createStandSchema = z.object({
  festival: z.string().min(1, "Выберите мероприятие"),
  last_name: z.string().optional(),
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  phone_number: phone_number,
  email: email,
  country: z.string().optional(),
  city: z.string().optional(),
  occupation: z.string().optional(),
  project_name: z
    .string()
    .min(1, "Название проекта не может быть пустым")
    .max(255, "Максимум 255 символов"),
  needs_electricity: z.boolean().optional(),
  stand: z.string().min(1, "Выберите мероприятие"),
});

// Schema for a stand.
export const standSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Название стенда обязательно"),
  x: z.number(),
  y: z.number(),
  width: z.number().min(1, "Ширина должна быть не менее 1"),
  height: z.number().min(1, "Высота должна быть не менее 1"),
  status: z.enum(["available", "occupied", "booked"]),
  description: z.string().nullable(),
});

// Main event layout schema. Note: bgImage is expected to be a File (or null).
export const eventLayoutSchema = z.object({
  id: z.number(),
  width: z.number().min(10, "Минимум 10").max(1200, "Максимум 1200"),
  height: z.number().min(10, "Минимум 10").max(1000, "Максимум 1000"),
  bgImage: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Загрузите изображение в формате файла",
    })
    .nullable()
    .optional(),
  stands: z.array(standSchema),
});

export type TEventLayoutFormData = z.infer<typeof eventLayoutSchema>;

export type TStandFormData = z.infer<typeof createStandSchema>;
