import z from "zod";

export const phone_number = z
  .string()
  .min(1, "Телефон не может быть пустым")
  .max(20, "Максимум 20 символов");

export const email = z
  .string()
  .email("Неверный email")
  .max(254, "Максимум 254 символа");

export const country = z
  .string({
    required_error: "Страна обязательна для заполнения",
    invalid_type_error: "Страна должна быть строкой",
  })
  .min(1, "Страна не может быть пустой")
  .max(100, "Максимум 100 символов");

export const city = z
  .string({
    required_error: "Город обязателен для заполнения",
    invalid_type_error: "Город должен быть строкой",
  })
  .min(1, "Город не может быть пустым")
  .max(100, "Максимум 100 символов");
