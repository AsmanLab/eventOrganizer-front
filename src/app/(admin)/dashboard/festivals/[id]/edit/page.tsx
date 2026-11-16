"use client";

import FestivalForm from "@/components/forms/festival/FestivalForm";
import { useFestivalById, useUpdateFestival } from "api/festivals/queries";
import { useParams } from "next/navigation";
import { TFestival } from "shared/types/festivals";
import { toast } from "sonner";

export default function EditFestival() {
  const { id } = useParams() as { id: string };

  const { data, isLoading, error, refetch } = useFestivalById(id);
  const updateFestivalMutation = useUpdateFestival();

  if (isLoading) {
    return <div>Загрузка данных мероприятия…</div>;
  }
  if (error || !data) {
    return <div>Ошибка загрузки данных мероприятия.</div>;
  }

  const handleUpdateFestival = async (formData: FormData) => {
    try {
      await updateFestivalMutation.mutateAsync({ id, updatedData: formData });
      await refetch();
      toast.success("Мероприятие успешно обновлено");
    } catch (error) {
      toast.error("Ошибка при обновлении мероприятия");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl w-full border-border border p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-4">Редактировать мероприятие</h1>
      <FestivalForm
        isCreateForm={false}
        initialData={data.festival as TFestival}
        onSubmit={handleUpdateFestival}
      />
    </div>
  );
}
