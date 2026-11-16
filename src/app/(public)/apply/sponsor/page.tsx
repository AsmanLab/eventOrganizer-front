"use client";

import SponsorPublicForm from "@/components/forms/sponsor/SponsorPublicForm";
import { useFestivalOptions } from "@/components/providers/FestivalProvider";
import { useCreateSponsor } from "api/sponsors/queries";

const ApplySponsorPage = () => {
  const festivalOptions = useFestivalOptions();
  const createMuatation = useCreateSponsor();

  const handleSubmit = async (data: FormData) => {
    await createMuatation.mutateAsync(data);
  };

  return (
    <SponsorPublicForm
      festivalOptions={festivalOptions}
      onSubmit={handleSubmit}
    />
  );
};

export default ApplySponsorPage;
