"use client";

import SpeakerPublicForm from "@/components/forms/speaker/SpeakerPublicForm";
import { useFestivalOptions } from "@/components/providers/FestivalProvider";
import { useCreateSpeaker } from "api/speaker/queries";

const ApplySpeakerPage = () => {
  const festivalOptions = useFestivalOptions();
  const createMuatation = useCreateSpeaker();

  const handleSubmit = async (data: FormData) => {
    await createMuatation.mutateAsync(data);
  };

  return (
    <SpeakerPublicForm
      festivalOptions={festivalOptions}
      onSubmit={handleSubmit}
    />
  );
};

export default ApplySpeakerPage;
