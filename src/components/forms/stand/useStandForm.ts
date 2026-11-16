"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { createStandSchema, TStandFormData } from "@/schemas/stand-schema";
import { TStandApplication } from "shared/types/types";
import { useState } from "react";

export interface UseStandFormProps {
  initialData?: TStandApplication;
  onSubmit: (data: TStandFormData) => Promise<void>;
  handleOpenAlertDialog: () => void;
}

export function useStandForm({
  initialData,
  onSubmit,
  handleOpenAlertDialog,
}: UseStandFormProps) {
  const form = useForm<TStandFormData>({
    resolver: zodResolver(createStandSchema),
    defaultValues: {
      festival: initialData?.festival || "",
      stand: initialData?.stand || "",
      last_name: initialData?.last_name || "",
      first_name: initialData?.first_name || "",
      middle_name: initialData?.middle_name || "",
      phone_number: initialData?.phone_number || "",
      email: initialData?.email || "",
      country: initialData?.country || "",
      city: initialData?.city || "",
      occupation: initialData?.occupation || "",
      project_name: initialData?.project_name || "",
      needs_electricity: initialData?.needs_electricity || false,
    },
  });
  const { setError, reset } = form;
  const [otherValue, setOtherValue] = useState("");

  const handleFormSubmit: (values: TStandFormData) => Promise<void> = async (
    values: TStandFormData
  ) => {
    let finalOccupation = values.occupation;
    if (values.occupation === "Другое") {
      if (!otherValue.trim()) {
        setError("occupation", {
          message: "Пожалуйста, укажите другое значение для рода деятельности",
        });
        return;
      }
      finalOccupation = otherValue;
    }

    const formData = {
      ...values,
      occupation: finalOccupation,
    };

    try {
      await onSubmit(formData);
      handleOpenAlertDialog();
      reset();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        const backendErrors = error.response?.data;

        Object.entries(backendErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            setError(field as keyof TStandFormData, {
              message: messages.join(", "),
            });
          }
        });
      }
    }
  };

  return { form, otherValue, setOtherValue, handleFormSubmit };
}
