"use client";

import StandPublicForm from "@/components/forms/stand/StandPublicForm";
import { useFestivalOptions } from "@/components/providers/FestivalProvider";
import { TStandFormData } from "@/schemas/stand-schema";
import { useCreateStandApplication } from "api/stands/queries";
import { TStandApplication } from "shared/types/types";

const ApplyStandPage = () => {
  const festivalOptions = useFestivalOptions();
  const createMuatation = useCreateStandApplication();

  const handleSubmit = async (data: TStandFormData) => {
    await createMuatation.mutateAsync(data as TStandApplication);
  };

  return (
    <StandPublicForm
      festivalOptions={festivalOptions}
      onSubmit={handleSubmit}
    />
  );
};

export default ApplyStandPage;
