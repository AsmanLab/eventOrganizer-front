import { z } from "zod";

export const createFestivalSchema = z
  .object({
    title: z
      .string()
      .min(1, "Название мероприятия не может быть пустым")
      .max(255, "Название не должно превышать 255 символов"),
    short_description: z
      .string()
      .min(1, "Короткое описание обязательно")
      .max(255, "Короткое описание не должно превышать 255 символов"),
    description: z.string().min(1, "Описание не может быть пустым"),
    start_date: z.date({ message: "Дата начала обязательна" }),
    end_date: z.date({ message: "Неверный формат даты окончания" }),
    location: z
      .string()
      .min(1, "Место проведения не может быть пустым")
      .max(255, "Место проведения не должно превышать 255 символов"),
    image: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Загрузите изображение в формате файла",
      })
      .nullable()
      .optional(),
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: "Дата окончания должна быть позже даты начала",
    path: ["end_date"],
  });

export type TFestvialFormData = z.infer<typeof createFestivalSchema>;
