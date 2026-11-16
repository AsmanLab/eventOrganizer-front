import { z } from "zod";
import { phone_number, email, country, city } from "./common-schemas";

export const createParticipantSchema = z.object({
  festival: z.string().min(1, "Выберите мероприятие"),
  last_name: z
    .string({
      required_error: "Фамилия обязательна для заполнения",
      invalid_type_error: "Фамилия должна быть строкой",
    })
    .min(1, "Фамилия не может быть пустой"),
  first_name: z
    .string({
      required_error: "Имя обязательно для заполнения",
      invalid_type_error: "Имя должно быть строкой",
    })
    .min(1, "Имя не может быть пустым"),
  middle_name: z.string(),
  phone_number: phone_number,
  email: email,
  country: country,
  city: city,
  professional_status: z.string().min(1, "Укажите кто вы"),
  visit_purposes: z.array(z.number()).min(1, "Выберите хотя бы одну цель"),
});

// Inferred TypeScript type for the form data
export type TParticipantFormData = z.infer<typeof createParticipantSchema>;
