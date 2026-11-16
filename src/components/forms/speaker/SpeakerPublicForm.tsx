"use client";

import { Controller } from "react-hook-form";
import { BaseForm } from "../BaseForm"; // Reusable form wrapper that provides FormProvider and wraps a <form>
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useSpeakerForm } from "./useSpeakerForm";
import { TSpeaker } from "shared/types/speaker";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertDialogDemo } from "@/components/alert-dialog";
import { Send } from "lucide-react";
import { BRAND } from "shared/brand";

export interface SpeakerFormProps {
  isCreateForm?: boolean;
  isLoading?: boolean;
  festivalOptions: ComboboxOption[];
  initialData?: TSpeaker;
  onSubmit: (data: FormData) => Promise<void>;
}

export default function SpeakerPublicForm({
  isCreateForm = true,
  isLoading = false,
  festivalOptions,
  initialData,
  onSubmit,
}: SpeakerFormProps) {
  const [open, setOpen] = useState(false);
  const { form, otherValue, setOtherValue, handleFormSubmit } = useSpeakerForm({
    initialData,
    onSubmit,
    hanldeOpenAlertDilog: isCreateForm ? () => setOpen(true) : undefined,
  });
  const { control } = form;

  return (
    <BaseForm
      form={form}
      onSubmit={handleFormSubmit}
      className="space-y-6 max-w-3xl mx-auto py-2 pb-8"
    >
      {isCreateForm && (
        <AlertDialogDemo
          open={open}
          onOpen={setOpen}
          title={`Здравствуйте!`}
          description={`Спасибо, что подали заявку на ${BRAND.name}! Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.`}
        />
      )}

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
                    className="h-11 w-max bg-slate-100 border-transparent focus-visible:ring-main-blue"
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

      {/* Occupation Field */}
      <FormField
        control={control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="occupation">
              Род деятельности<span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== "Другое") {
                    setOtherValue("");
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4"
              >
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="Компания" id="company" />
                  <span>Компания</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="Производство" id="manufacturing" />
                  <span>Производство</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="Маркетинг" id="marketing" />
                  <span>Маркетинг</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="Другое" id="others" />
                  <span>Другое</span>
                </label>
              </RadioGroup>
            </FormControl>
            <FormMessage />
            {field.value === "Другое" && (
              <div className="mt-2">
                <Input
                  placeholder="Укажите другое"
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                />
              </div>
            )}
          </FormItem>
        )}
      />

      {/* Achievements Field */}
      <FormField
        control={control}
        name="achievements"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="achievements">Регалии и достижения</FormLabel>
            <FormControl>
              <Input
                id="achievements"
                type="text"
                placeholder="Введите ваши регалии и достижения"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Topic Field */}
      <FormField
        control={control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="topic">
              Тема выступления<span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Input
                id="topic"
                type="text"
                placeholder="Введите тему выступления"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Duration Field */}
      <FormField
        control={control}
        name="speech_duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="speech_duration">
              Сколько времени нужно на выступление?
              <span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Input
                id="speech_duration"
                type="text"
                placeholder="Например, 30 минут"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Performance Time Field */}
      <FormField
        control={control}
        name="preferred_time"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="preferred_time">
              В какое время хотите выступить?
              <span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Input
                id="preferred_time"
                type="text"
                placeholder="Например, 18:00"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Equipment Field */}
      <FormField
        control={control}
        name="equipment_needed"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="equipment_needed">
              Вспомогательная аппаратура или инвентарь (если нужно)
            </FormLabel>
            <FormControl>
              <Textarea
                id="equipment_needed"
                placeholder="Опишите, какая аппаратура или инвентарь потребуется"
                className="resize-none bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Ticket Price Field */}
      <FormField
        control={control}
        name="ticket_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="ticket_price">
              Сколько по-вашему должен стоить билет для посетителя на ваше
              выступление? (в сомах)
              <span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Input
                id="ticket_price"
                type="text"
                placeholder="Введите стоимость билета"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        size={"lg"}
        className="bg-main-blue hover:bg-main-blue/85"
        disabled={isLoading}
      >
        {isCreateForm ? "Отправить заявку" : "Сохранить изменения"}
        <Send className="size-6 ml-2" />
      </Button>
    </BaseForm>
  );
}
