"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface EventlayoutSettingsFormProps {
  preview: string | null;
  onBgImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventlayoutSettingsForm = ({
  preview,
  onBgImageChange,
}: EventlayoutSettingsFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Настройки площадки мероприятия</h2>
      <FormField
        control={control}
        name="width"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="width">Ширина площадки (px)</FormLabel>
            <FormControl>
              <Input
                id="width"
                type="number"
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
            <FormLabel htmlFor="height">Высота площадки (px)</FormLabel>
            <FormControl>
              <Input
                id="height"
                type="number"
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
      <FormItem>
        <FormLabel>Фоновое изображение</FormLabel>
        <FormControl>
          <label
            htmlFor="bgImage"
            className="flex flex-col items-center justify-center border-[1.5px] border-dashed border-admin-secondary rounded-md p-6 w-full text-center cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600">
                {preview ? "Изменить изображение" : "Выберите файл"}
              </span>
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  width={80}
                  height={80}
                  style={{ width: "auto", height: "80px" }}
                />
              )}
            </div>
            <Input
              id="bgImage"
              type="file"
              accept="image/*"
              onChange={onBgImageChange}
              className="hidden"
            />
          </label>
        </FormControl>
      </FormItem>
    </div>
  );
};

export default EventlayoutSettingsForm;
