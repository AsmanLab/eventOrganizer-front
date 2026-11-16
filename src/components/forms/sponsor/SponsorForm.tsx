"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSponsorForm } from "./useSponsorForm";
import { Combobox, ComboboxOption } from "@/components/combobox";
import { Controller } from "react-hook-form";
import { TSponsor } from "shared/types/sponsor";
import { Send } from "lucide-react";
import Image from "next/image";

export interface SponsorFormProps {
  festivalOptions: ComboboxOption[];
  initialData?: TSponsor;
  onSubmit: (data: FormData) => Promise<void>;
}

export default function SponsorForm({
  festivalOptions,
  initialData,
  onSubmit,
}: SponsorFormProps) {
  const { form, preview, otherValue, setOtherValue, handleFormSubmit } =
    useSponsorForm({
      initialData,
      onSubmit,
    });
  const { control } = form;

  return (
    <BaseForm
      form={form}
      onSubmit={handleFormSubmit}
      className="space-y-6 max-w-3xl mx-auto py-2 pb-8"
    >
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
                  autoComplete="first_name"
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
                  autoComplete="last_name"
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
                  placeholder="Введите отчество"
                  autoComplete="middle_name"
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
                  placeholder="+996XXXXXXX"
                  autoComplete="phone_number"
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
                  placeholder="example@example.com"
                  autoComplete="email"
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
                  placeholder="Введите страну"
                  autoComplete="country"
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
                  placeholder="Введите город"
                  autoComplete="city"
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

      {/* Social Network Link Field */}
      <FormField
        control={control}
        name="social_network_links"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="social_network_links">Ссылка</FormLabel>
            <FormControl>
              <Input
                id="social_network_links"
                type="url"
                placeholder="Введите ссылку"
                className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormDescription>Ссылка на ваш сайт или соцсеть</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Help Offer Field */}
      <FormField
        control={control}
        name="help_offer"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="help_offer">
              Чем вы готовы помочь?<span className="text-main-red">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                id="help_offer"
                placeholder="Введите детали спонсорства"
                className="resize-none bg-slate-100 border-transparent focus-visible:ring-main-blue"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Logo Field */}
      <FormField
        control={control}
        name="logo"
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>Логотип</FormLabel>
            <FormControl>
              <label
                htmlFor="logo-file"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 w-full text-center cursor-pointer"
              >
                <span className="text-lg text-gray-600 mb-2">
                  Выберите файл
                </span>
                <Input
                  id="logo-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            </FormControl>
            {preview && (
              <Image
                src={preview}
                height={144}
                width={144}
                alt="Preview"
                className="mt-2 max-h-36"
              />
            )}
            <FormMessage />
          </FormItem>
        )}
      />

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
