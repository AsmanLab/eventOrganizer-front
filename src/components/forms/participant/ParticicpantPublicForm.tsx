"use client";

import { Controller } from "react-hook-form";
import { BaseForm } from "../BaseForm";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import MultiSelect from "@/components/multiselect";
import { useState } from "react";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { TParticipant } from "shared/types/participant";
import { useParticipantForm } from "./useParticipantForm";
import { AlertDialogDemo } from "@/components/alert-dialog";
import { Send } from "lucide-react";
import { TParticipantFormData } from "@/schemas/participant-schema";
import { BRAND } from "shared/brand";

const professional_status_options = [
  { value: "pro", label: "Специалист" },
  { value: "coffee_lover", label: "Гость" },
  { value: "producer", label: "Студент / соискатель" },
  { value: "business_owner", label: "Владелец бизнеса" },
  { value: "coffee_producer", label: "Представитель компании" },
  {
    value: "related_goods_producer",
    label: "Пресса / блогер",
  },
];

export interface SponsorFormProps {
  festivalOptions: ComboboxOption[];
  visitPurposeOptions: ComboboxOption[];
  initialData?: TParticipant;
  onSubmit: (data: TParticipantFormData) => Promise<void>;
}

export default function ParticipantPublicForm({
  visitPurposeOptions,
  festivalOptions,
  initialData,
  onSubmit,
}: SponsorFormProps) {
  const [open, setOpen] = useState(false);
  const { form, handleFormSubmit } = useParticipantForm({
    initialData,
    onSubmit,
    hanldeOpenAlertDilog: () => setOpen(true),
  });
  const { control } = form;

  return (
    <BaseForm
      form={form}
      onSubmit={handleFormSubmit}
      className="space-y-6 max-w-3xl mx-auto pt-2 pb-8"
    >
      <AlertDialogDemo
        open={open}
        onOpen={setOpen}
        title={`Здравствуйте!`}
        description={`Спасибо, что зарегистрировались на ${BRAND.name}! Письмо с билетом и QR-кодом отправлено на указанную почту. До встречи!`}
      />
      {/* Festival field */}
      <FormField
        control={control}
        name="festival"
        render={({}) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>
              Мероприятие<span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Controller
                control={control}
                name="festival"
                render={({ field: { value, onChange } }) => (
                  <Combobox
                    options={festivalOptions || []}
                    placeholder="Выберите мероприятие"
                    value={value}
                    onChange={onChange}
                    className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  />
                )}
              />
            </FormControl>
            <FormDescription>
              Выберите мероприятие, на который хотите подать заявку
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name Field */}
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="first_name">
                Имя<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Введите имя"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name Field */}
        <FormField
          control={control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="last_name">
                Фамилия<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Введите фамилию"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Middle Name Field */}
        <FormField
          control={control}
          name="middle_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="middle_name">Отчество</FormLabel>
              <FormControl>
                <Input
                  id="middle_name"
                  type="text"
                  placeholder="Введите отчество"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone_number">
                Номер телефона<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="phone_number"
                  type="tel"
                  placeholder="+996XXXXXXX"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">
                Эл. почта<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Country Field */}
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="country">
                Страна<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="country"
                  type="text"
                  placeholder="Введите страну"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City Field */}
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="city">
                Город<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="city"
                  type="text"
                  placeholder="Введите город"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Professional status */}
      <FormField
        control={control}
        name="professional_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Кто вы?<span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue">
                  <SelectValue
                    placeholder="Выберите категорию"
                    className="flex-1 self-center"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {professional_status_options.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Visit Purposes */}
      <div className="relative">
        <FormField
          control={control}
          name="visit_purposes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Основные цели посещения выставки (можно выбрать несколько)
                <span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Выберите цели"
                  options={visitPurposeOptions.map((item) => ({
                    label: item.label,
                    value: Number(item.value),
                  }))}
                  selectedOptions={field.value || []}
                  setSelectedOptions={field.onChange}
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        type="submit"
        size={"lg"}
        className="bg-main-blue hover:bg-main-blue/85"
      >
        Отправить заявку
        <Send className="size-6 ml-2" />
      </Button>
    </BaseForm>
  );
}
