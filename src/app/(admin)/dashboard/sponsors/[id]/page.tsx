"use client";

import SponsorPublicForm from "@/components/forms/sponsor/SponsorPublicForm";
import { useFestivals } from "api/festivals/queries";
import { useSponsorById, useUpdateSponsor } from "api/sponsors/queries";
import { useParams } from "next/navigation";
import { TFestival } from "shared/types/festivals";
import { toast } from "sonner";

export default function EditSpeaker() {
  const { id } = useParams() as { id: string };
  const {
    data: festivals,
    isLoading: isLoadingFestivals,
    error: errorFestivals,
  } = useFestivals();

  const {
    data: sponsor,
    isLoading: isLoadingSponsor,
    error: errorSponsor,
  } = useSponsorById(id);

  const { mutateAsync: updateSpeaker, isPending } = useUpdateSponsor();

  if (isLoadingFestivals || isLoadingSponsor) {
    return <div>Загрузка данных мероприятия…</div>;
  }
  if (errorFestivals || errorSponsor || !festivals || !sponsor) {
    return <div>Ошибка загрузки данных мероприятия.</div>;
  }

  const festivalOptions = festivals.map((festival: TFestival) => ({
    value: `${festival.id}`,
    label: festival.title,
  }));

  const handleUpdateSpeaker = async (formData: FormData) => {
    try {
      await updateSpeaker({ id, updatedData: formData });
      toast.success("Спонсор успешно обновлен");
    } catch (error) {
      toast.error("Ошибка при обновлении спонсора");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl w-full border-border border p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-4">Редактировать Спонсора</h1>
      <SponsorPublicForm
        isLoading={isPending}
        isCreateForm={false}
        initialData={sponsor}
        festivalOptions={festivalOptions}
        onSubmit={handleUpdateSpeaker}
      />
    </div>
  );
}
