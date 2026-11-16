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
import { useEffect, useState } from "react";
import { useStandForm } from "./useStandForm";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertDialogDemo } from "@/components/alert-dialog";
import { Send } from "lucide-react";
import { TStandApplication } from "shared/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { TStandFormData } from "@/schemas/stand-schema";

import EventLayoutPublicView from "@/components/event-layouts/EventLayoutPublicView";
import { useRouter, useSearchParams } from "next/navigation";
import { UDialogControlled } from "@/components/u-dialog";
import { BRAND } from "shared/brand";

export interface SpeakerFormProps {
  festivalOptions: ComboboxOption[];
  initialData?: TStandApplication;
  onSubmit: (data: TStandFormData) => Promise<void>;
}

export default function StandPublicForm({
  festivalOptions,
  initialData,
  onSubmit,
}: SpeakerFormProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openStand, setOpenStand] = useState(false);
  const { form, otherValue, setOtherValue, handleFormSubmit } = useStandForm({
    initialData,
    onSubmit,
    handleOpenAlertDialog: () => setOpen(true),
  });
  const { control, setValue, watch, formState} = form;
  const selectedFestival = watch("festival");

  useEffect(() => {
    const standParam = currentSearchParams.get("stand");
    if (standParam) {
      setValue("stand", standParam);
    }

    const dialogStandParam = currentSearchParams.get("dialogstand");
    setOpenStand(dialogStandParam === "true");

    // Устанавливаем ближайший мероприятие по умолчанию
    if (festivalOptions && festivalOptions.length > 0 && !selectedFestival) {
      const nearestFestival = festivalOptions[0];
      setValue("festival", nearestFestival.value);
    }

    // Устанавливаем заглушки для скрытых полей
    setValue("first_name", "Не указано");
    setValue("last_name", "Не указано");
    setValue("middle_name", "Не указано");
    setValue("country", "Не указано");
    setValue("city", "Не указано");
    setValue("occupation", "Не указано");
    setValue("needs_electricity", false);
  }, [currentSearchParams, setValue, festivalOptions, selectedFestival]);

  const hanldeDialogStand = (open: boolean) => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      if (open) {
        currentUrl.searchParams.set("dialogstand", "true");
      } else {
        currentUrl.searchParams.delete("dialogstand");
      }
      router.replace(currentUrl.pathname + currentUrl.search);
    }
  };

  return (
    <BaseForm
      form={form}
      onSubmit={(data) => {
        return handleFormSubmit(data);
      }}
      className="space-y-6 max-w-3xl mx-auto py-2 pb-8"
    >
      <AlertDialogDemo
        open={open}
        onOpen={setOpen}
        title={`Здравствуйте!`}
        description={`Спасибо, что подали заявку на ${BRAND.name}! Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.`}
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

      {/* Stand Field */}
      <FormField
        control={control}
        name="stand"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="stand">
              Стенд<span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Input
                id="stand"
                type="number"
                disabled={true}
                placeholder="Сначала выберите мероприятие"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormDescription>Выберите мероприятие, затем стенд</FormDescription>
            
            {/* Pricing Information */}
            <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Стоимость стенда:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Одна открытая сторона + 0%</li>
                <li>• Две открытые стороны + 15%</li>
                <li>• Три открытые стороны + 25%</li>
                <li>• Четыре открытые стороны + 30% к стоимости базового стенда</li>
              </ul>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />

      <UDialogControlled
        onOpenChange={hanldeDialogStand}
        isOpen={openStand}
        title="Схема зала"
        triggerElement={
          <Button
            disabled={!selectedFestival}
            className="bg-main-red hover:bg-main-red/85"
          >
            Выбрать стенд
          </Button>
        }
      >
        <EventLayoutPublicView festivalId={selectedFestival} />
      </UDialogControlled>

      {/* Project Name Field */}
      <FormField
        control={control}
        name="project_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="project_name">
              Название компании или проекта
              <span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Input
                id="project_name"
                placeholder="Введите название"
                autoComplete="project_name"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name Field */}
        {/* <FormField
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
        /> */}

        {/* Last Name Field */}
        {/* <FormField
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
        /> */}

        {/* Middle Name Field */}
        {/* <FormField
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
        /> */}

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
                Эл. почта компании<span className="text-main-red">*</span>
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
        {/* <FormField
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
        /> */}

        {/* City Field */}
        {/* <FormField
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
        /> */}
      </div>

      {/* Occupation Field */}
      {/* <FormField
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
      /> */}

      {/* Needs Electricity Checkbox */}
      {/* <FormField
        control={control}
        name="needs_electricity"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>
              Понадобится ли вам электричество на стенде
              <span className="text-main-red">*</span>
            </FormLabel>
          </FormItem>
        )}
      /> */}

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
