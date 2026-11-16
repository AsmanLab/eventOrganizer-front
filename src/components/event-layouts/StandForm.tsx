"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
//import { TStand } from "shared/types/event-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema for stand creation.
const StandSchema = z.object({
  name: z.string().nonempty("Название стенда обязательно"),
  x: z.number({ invalid_type_error: "X-координата должна быть числом" }).min(0),
  y: z.number({ invalid_type_error: "Y-координата должна быть числом" }).min(0),
  width: z.number({ invalid_type_error: "Ширина обязательна" }).min(1),
  height: z.number({ invalid_type_error: "Высота обязательна" }).min(1),
  status: z.enum(["available", "occupied", "booked"]),
  description: z.string(),
});

export type StandFormData = z.infer<typeof StandSchema>;

interface StandFormProps {
  initialData?: StandFormData;
  onSubmit: (data: StandFormData) => void;
}

const StandForm: React.FC<StandFormProps> = ({ initialData, onSubmit }) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<StandFormData>({
    resolver: zodResolver(StandSchema),
    defaultValues: {
      name: initialData?.name || "",
      x: initialData?.x || 0,
      y: initialData?.y || 0,
      width: initialData?.width || 50,
      height: initialData?.height || 50,
      status: initialData?.status || "available",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: StandFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg bg-white">
      <h2 className="text-xl font-semibold">Создать стенд</h2>
      <div className="space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="standName">Название стенда</FormLabel>
              <FormControl>
                <Input
                  id="standName"
                  placeholder="Введите название стенда"
                  {...field}
                />
              </FormControl>
              {errors.name && (
                <FormMessage>{errors.name.message as string}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="x"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="x">X-координата</FormLabel>
              <FormControl>
                <Input
                  id="x"
                  type="number"
                  placeholder="Введите X-координату"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              {errors.x && (
                <FormMessage>{errors.x.message as string}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="y"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="y">Y-координата</FormLabel>
              <FormControl>
                <Input
                  id="y"
                  type="number"
                  placeholder="Введите Y-координату"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              {errors.y && (
                <FormMessage>{errors.y.message as string}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="width">Ширина</FormLabel>
              <FormControl>
                <Input
                  id="width"
                  type="number"
                  placeholder="Введите ширину"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              {errors.width && (
                <FormMessage>{errors.width.message as string}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="height">Высота</FormLabel>
              <FormControl>
                <Input
                  id="height"
                  type="number"
                  placeholder="Введите высоту"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : "")
                  }
                />
              </FormControl>
              {errors.height && (
                <FormMessage>{errors.height.message as string}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="status">Статус</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="available">Доступен</SelectItem>
                  <SelectItem value="occupied">Занят</SelectItem>
                  <SelectItem value="booked">Забронирован</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <FormMessage>{errors.status.message as string}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Описание</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Введите описание"
                  {...field}
                />
              </FormControl>
              {errors.description && (
                <FormMessage>
                  {errors.description.message as string}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
      </div>
      <Button onClick={handleSubmit(onFormSubmit)} type="button">
        Добавить стенд
      </Button>
    </div>
  );
};

export default StandForm;
