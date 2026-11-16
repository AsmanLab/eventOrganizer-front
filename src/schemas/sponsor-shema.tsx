import { z } from "zod";
import { email, phone_number, country, city } from "./common-schemas";

export const createSponsorSchema = z.object({
  festival: z.string().min(1, "Выберите мероприятие"),
  first_name: z
    .string({
      required_error: "Введите имя",
      invalid_type_error: "Имя должно быть строкой",
    })
    .min(1, "Имя не может быть пустым"),
  last_name: z
    .string({
      required_error: "Введите фамилию",
      invalid_type_error: "Фамилия должна быть строкой",
    })
    .min(1, "Фамилия не может быть пустой"),
  middle_name: z.string(),
  phone_number: phone_number,
  email: email,
  country: country,
  city: city,
  occupation: z
    .string({
      required_error: "Введите ваш род деятельности",
      invalid_type_error: "Род деятельности должен быть строкой",
    })
    .min(1, "Род деятельности не может быть пустым"),
  project_name: z
    .string({
      required_error: "Введите название компании или проекта",
      invalid_type_error: "Название проекта должно быть строкой",
    })
    .min(1, "Название проекта не может быть пустым"),
  description: z.string().max(255, "Описание не должно превышать 255 символов"),
  social_network_links: z.preprocess(
    (val) => (val === null || val === "" ? undefined : val),
    z.string().url("Введите корректный URL социальной сети").optional()
  ),
  help_offer: z
    .string({
      required_error: "Опишите, чем вы готовы помочь",
      invalid_type_error: "Описание помощи должно быть строкой",
    })
    .min(1, "Описание помощи не может быть пустым"),
  logo: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Загрузите изображение в формате файла",
    })
    .nullable()
    .optional(),
});

export type TSponsorFormData = z.infer<typeof createSponsorSchema>;
