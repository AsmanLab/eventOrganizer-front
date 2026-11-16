"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSponsorSchema, TSponsorFormData } from "@/schemas/sponsor-shema";
import { TSponsor } from "shared/types/sponsor";
import { AxiosError } from "axios";
import { getImageURL } from "@/components/lib/utils";

const getDefaultValues = (data?: TSponsor) => ({
  festival: data?.festival.toString() || "",
  first_name: data?.first_name || "",
  last_name: data?.last_name || "",
  middle_name: data?.middle_name || "",
  phone_number: data?.phone_number || "",
  email: data?.email || "",
  country: data?.country || "",
  city: data?.city || "",
  occupation: data?.occupation || "Компания",
  social_network_links: data?.social_network_links || "",
  project_name: data?.project_name || "",
  description: data?.description || "",
  help_offer: data?.help_offer || "",
  logo: null,
});

export interface UseSponsorFormProps {
  initialData?: TSponsor;
  onSubmit: (data: FormData) => Promise<void>;
  hanldeOpenAlertDilog?: () => void;
}

export function useSponsorForm({
  initialData,
  onSubmit,
  hanldeOpenAlertDilog,
}: UseSponsorFormProps) {
  const form = useForm<TSponsorFormData>({
    resolver: zodResolver(createSponsorSchema),
    defaultValues: getDefaultValues(initialData),
  });
  const { control, setError, reset, setValue } = form;
  const [otherValue, setOtherValue] = useState("");
  const logoFile = useWatch({ control, name: "logo" });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      reset(getDefaultValues(initialData));
      setPreview(getImageURL(initialData.logo));
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

  // Manage logo file preview
  useEffect(() => {
    if (logoFile) {
      const objectUrl = URL.createObjectURL(logoFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    // setPreview(null);
  }, [logoFile]);

  // Custom submission logic: if occupation is "Другое", use the extra field value
  const handleFormSubmit = async (values: TSponsorFormData) => {
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
    formData.append("project_name", values.project_name);
    formData.append("description", values.description);
    formData.append("help_offer", values.help_offer);

    if (values.social_network_links) {
      formData.append("social_network_links", values.social_network_links);
    }

    if (values.logo instanceof File) {
      formData.append("logo", values.logo);
    }
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
              setError(field as keyof TSponsorFormData, {
                message: messages.join(", "),
              });
            }
          });
        }
      }
    }
  };

  return { form, preview, otherValue, setOtherValue, handleFormSubmit };
}
