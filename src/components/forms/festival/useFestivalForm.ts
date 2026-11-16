import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getImageURL } from "@/components/lib/utils";

import {
  createFestivalSchema,
  TFestvialFormData,
} from "@/schemas/festival-schema";
import { TFestival } from "shared/types/festivals";

export interface Props {
  initialData?: TFestival;
  onSubmit: (data: FormData) => Promise<void>;
}

export function useFestivalForm({ initialData, onSubmit }: Props) {
  const form = useForm<TFestvialFormData>({
    resolver: zodResolver(createFestivalSchema),
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      location: "",
      start_date: new Date(),
      end_date: new Date(),
      image: null,
    },
  });
  const { control, setError, reset } = form;
  const imageFile = useWatch({ control, name: "image" });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        short_description: initialData.short_description || "",
        description: initialData.description || "",
        location: initialData.location || "",
        start_date: initialData.start_date
          ? new Date(initialData.start_date)
          : new Date(),
        end_date: initialData.end_date
          ? new Date(initialData.end_date)
          : new Date(),
        image: null,
      });
      setPreview(getImageURL(initialData.image));
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (imageFile instanceof File) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const handleFormSubmit = async (values: TFestvialFormData) => {

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("short_description", values.short_description || "");
    formData.append("description", values.description || "");
    formData.append("location", values.location);
    formData.append("start_date", format(values.start_date, "yyyy-MM-dd"));
    formData.append("end_date", format(values.end_date, "yyyy-MM-dd"));
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    try {
      await onSubmit(formData);
      reset();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        const backendErrors = error.response?.data;
        Object.entries(backendErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            setError(field as keyof TFestvialFormData, {
              message: messages.join(", "),
            });
          }
        });
      }
    }
  };

  return { form, preview, handleFormSubmit };
}
