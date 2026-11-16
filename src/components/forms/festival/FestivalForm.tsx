"use client";

import MarkdownEditor from "@uiw/react-md-editor";
import { cn, formatDate } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Send } from "lucide-react";
import { TFestival } from "shared/types/festivals";
import { useFestivalForm } from "./useFestivalForm";
import Image from "next/image";

export interface FestivalFormProps {
  isCreateForm?: boolean;
  initialData?: TFestival;
  onSubmit: (data: FormData) => Promise<void>;
}

export default function FestivalForm({
  isCreateForm = true,
  initialData,
  onSubmit,
}: FestivalFormProps) {
  const { form, preview, handleFormSubmit } = useFestivalForm({
    initialData,
    onSubmit,
  });
  const { control } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6 max-w-3xl mx-auto py-2 pb-8"
      >
        {/* Название мероприятия */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">
                Название мероприятия<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="title"
                  type="text"
                  placeholder="Введите название мероприятия"
                  autoComplete="off"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Короткое описание */}
        <FormField
          control={control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="short_description">
                Короткое описание<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="short_description"
                  type="text"
                  placeholder="Введите короткое описание мероприятия"
                  autoComplete="off"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Дата начала */}
          <FormField
            control={control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5">
                <FormLabel>
                  Дата начала<span className="text-main-red">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? formatDate(field.value)
                          : "Выберите дату"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Дата окончания */}
          <FormField
            control={control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5">
                <FormLabel>
                  Дата окончания<span className="text-main-red">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? formatDate(field.value)
                          : "Выберите дату"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Место проведения */}
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="location">
                Место проведения<span className="text-main-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="location"
                  type="text"
                  placeholder="Введите место проведения"
                  autoComplete="off"
                  className="h-11 bg-slate-100 border-transparent focus-visible:ring-main-blue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Изображение */}
        <FormField
          control={control}
          name="image"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Изображение</FormLabel>
              <FormControl>
                <label
                  htmlFor="image-file"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 w-full text-center cursor-pointer"
                >
                  <span className="text-lg text-gray-600 mb-2">
                    {preview ? "Заменить изображение" : "Выберите файл"}
                  </span>
                  <Input
                    id="image-file"
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

        <div data-color-mode="light">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">
                  Описание<span className="text-main-red">*</span>
                </FormLabel>
                <FormControl>
                  <MarkdownEditor
                    value={field.value}
                    id="description"
                    onChange={(value) => field.onChange(value)}
                    height={"220px"}
                    preview="edit"
                    style={{ borderRadius: 10, overflow: "hidden" }}
                    textareaProps={{
                      placeholder: "Write the content here...",
                    }}
                    previewOptions={{
                      disallowedElements: ["style"],
                    }}
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
          {isCreateForm ? "Создать Мероприятие" : "Сохранить изменения"}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </Form>
  );
}
