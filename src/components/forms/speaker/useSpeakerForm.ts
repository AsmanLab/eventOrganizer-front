"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  createSpeakerSchema,
  TSpeakerFormData,
} from "@/schemas/speaker-schema";
import { TSpeaker } from "shared/types/speaker";

export interface UseSpeakerFormProps {
  initialData?: TSpeaker;
  onSubmit: (data: FormData) => Promise<void>;
  hanldeOpenAlertDilog?: () => void;
}

const getDefaultValues = (data?: TSpeaker) => ({
  festival: data?.festival.toString() || "",
  first_name: data?.first_name || "",
  last_name: data?.last_name || "",
  middle_name: data?.middle_name || "",
  phone_number: data?.phone_number || "",
  email: data?.email || "",
  country: data?.country || "",
  city: data?.city || "",
  occupation: data?.occupation || "",
  achievements: data?.achievements || "",
  topic: data?.topic || "",
  speech_duration: data?.speech_duration || "",
  preferred_time: data?.preferred_time || "",
  equipment_needed: data?.equipment_needed || "",
  ticket_price: data?.ticket_price || "",
});

export function useSpeakerForm({
  initialData,
  onSubmit,
  hanldeOpenAlertDilog,
}: UseSpeakerFormProps) {
  const form = useForm<TSpeakerFormData>({
    resolver: zodResolver(createSpeakerSchema),
    defaultValues: getDefaultValues(initialData),
  });
  const { setError, reset, setValue } = form;
  const [otherValue, setOtherValue] = useState("");

  useEffect(() => {
    if (initialData) {
      reset(getDefaultValues(initialData));
      if (
        initialData.occupation &&
        !["Компания", "Производство", "Маркетинг"].includes(
          initialData.occupation
        )
      ) {
        setValue("occupation", "Другое");
        setOtherValue(initialData.occupation);
      }
    }
  }, [initialData, reset, setValue]);

  const handleFormSubmit = async (values: TSpeakerFormData) => {
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

    const formData = new FormData();
    formData.append("festival", values.festival);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("middle_name", values.middle_name);
    formData.append("phone_number", values.phone_number);
    formData.append("email", values.email);
    formData.append("country", values.country);
    formData.append("city", values.city);
    formData.append("occupation", finalOccupation);
    formData.append("achievements", values.achievements);
    formData.append("topic", values.topic);
    formData.append("speech_duration", values.speech_duration);
    formData.append("preferred_time", values.preferred_time);
    formData.append("ticket_price", values.ticket_price);

    try {
      await onSubmit(formData);
      hanldeOpenAlertDilog && hanldeOpenAlertDilog();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          const backendErrors = error.response?.data;

          // Iterate over backend error fields and set them
          Object.entries(backendErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              setError(field as keyof TSpeakerFormData, {
                message: messages.join(", "),
              });
            }
          });
        }
      }
    }
  };

  return { form, otherValue, setOtherValue, handleFormSubmit };
}
