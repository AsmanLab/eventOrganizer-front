import { z } from "zod";
import { phone_number, email, country, city } from "./common-schemas";

export const createSpeakerSchema = z.object({
  festival: z.string().min(1, "Выберите мероприятие"),
  last_name: z
    .string()
    .min(1, "Фамилия не может быть пустой")
    .max(100, "Максимум 100 символов"),
  first_name: z
    .string()
    .min(1, "Имя не может быть пустым")
    .max(100, "Максимум 100 символов"),
  middle_name: z.string().max(100, "Максимум 100 символов"),
  phone_number: phone_number,
  email: email,
  country: country,
  city: city,
  occupation: z
    .string()
    .min(1, "Профессия не может быть пустой")
    .max(255, "Максимум 255 символов"),
  achievements: z.string(),
  topic: z
    .string()
    .min(1, "Тема не может быть пустой")
    .max(255, "Максимум 255 символов"),
  speech_duration: z
    .string()
    .min(1, "Длительность не может быть пустой")
    .max(50, "Максимум 50 символов"),
  preferred_time: z
    .string()
    .min(1, "Время не может быть пустым")
    .max(50, "Максимум 50 символов"),
  equipment_needed: z.string(),
  ticket_price: z
    .string()
    .refine((val) => /^\d+(\.\d+)?$/.test(val), "Неверный формат"),
  // is_confirmed: z.boolean(),
});

export type TSpeakerFormData = z.infer<typeof createSpeakerSchema>;
