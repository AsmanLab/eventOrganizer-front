"use client";

import ParticipantPublicForm from "@/components/forms/participant/ParticicpantPublicForm";
import { useFestivalOptions } from "@/components/providers/FestivalProvider";
import { SkeletonForm } from "@/components/skeletons/skeletons";
import { TParticipantFormData } from "@/schemas/participant-schema";
import {
  useCreateParticipant,
  useVisitPurposes,
} from "api/participant/queires";

type TVisitPurpose = {
  id: number;
  name: string;
};

const ApplyParticipantPage = () => {
  const festivalOptions = useFestivalOptions();
  const { data: visitPurposes, isLoading, error } = useVisitPurposes();
  const createMuatation = useCreateParticipant();

  if (isLoading) {
    return <SkeletonForm />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const visitPurposeOptions = visitPurposes.map((item: TVisitPurpose) => ({
    value: item.id,
    label: item.name,
  }));

  const handleSubmit = async (data: TParticipantFormData) => {
    await createMuatation.mutateAsync(data);
  };

  return (
    <ParticipantPublicForm
      visitPurposeOptions={visitPurposeOptions}
      festivalOptions={festivalOptions}
      onSubmit={handleSubmit}
    />
  );
};

export default ApplyParticipantPage;
