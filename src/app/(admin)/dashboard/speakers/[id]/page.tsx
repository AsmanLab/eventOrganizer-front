"use client";

import SpeakerPublicForm from "@/components/forms/speaker/SpeakerPublicForm";
import { useFestivals } from "api/festivals/queries";
import { useSpeakerById, useUpdateSpeaker } from "api/speaker/queries";
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
    data: speaker,
    isLoading: isLoadingSpeaker,
    error: errorSpeaker,
  } = useSpeakerById(id);
  const { mutateAsync: updateSpeaker, isPending } = useUpdateSpeaker();

  if (isLoadingFestivals || isLoadingSpeaker) {
    return <div>Загрузка данных мероприятия…</div>;
  }
  if (errorFestivals || errorSpeaker || !festivals || !speaker) {
    return <div>Ошибка загрузки данных мероприятия.</div>;
  }

  const festivalOptions = festivals.map((festival: TFestival) => ({
    value: `${festival.id}`,
    label: festival.title,
  }));

  const handleUpdateSpeaker = async (formData: FormData) => {
    try {
      await updateSpeaker({ id, updatedData: formData });
      toast.success("Спикер успешно обновлен");
    } catch (error) {
      toast.error("Ошибка при обновлении спикера");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl w-full border-border border p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-4">Редактировать Спикера</h1>
      <SpeakerPublicForm
        isLoading={isPending}
        isCreateForm={false}
        initialData={speaker}
        festivalOptions={festivalOptions}
        onSubmit={handleUpdateSpeaker}
      />
    </div>
  );
}
