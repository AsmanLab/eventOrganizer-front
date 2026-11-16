"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { TParticipant } from "shared/types/participant";
import {
  createParticipantSchema,
  TParticipantFormData,
} from "@/schemas/participant-schema";

export interface Props {
  initialData?: TParticipant;
  onSubmit: (data: TParticipantFormData) => Promise<void>;
  hanldeOpenAlertDilog: () => void;
}

export function useParticipantForm({
  initialData,
  onSubmit,
  hanldeOpenAlertDilog,
}: Props) {
  const form = useForm<TParticipantFormData>({
    resolver: zodResolver(createParticipantSchema),
    defaultValues: {
      festival: initialData?.festival || "",
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      middle_name: initialData?.middle_name || "",
      phone_number: initialData?.phone_number || "",
      email: initialData?.email || "",
      country: initialData?.country || "",
      city: initialData?.city || "",
      professional_status: initialData?.professional_status || "",
      visit_purposes: initialData?.visit_purposes || [],
    },
  });
  const { setError, reset } = form;

  const handleFormSubmit = async (values: TParticipantFormData) => {
    try {
      await onSubmit(values);
      hanldeOpenAlertDilog();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          const backendErrors = error.response?.data;

          // Iterate over backend error fields and set them
          Object.entries(backendErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              setError(field as keyof TParticipantFormData, {
                message: messages.join(", "),
              });
            }
          });
        }
      }
    }
  };

  return { form, handleFormSubmit };
}
