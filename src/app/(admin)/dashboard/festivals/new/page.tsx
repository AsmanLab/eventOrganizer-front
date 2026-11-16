"use client";

import FestivalForm from "@/components/forms/festival/FestivalForm";
import { useCreateFestival } from "api/festivals/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FestivalCreate = () => {
  const router = useRouter();
  const createFestivalMutation = useCreateFestival();

  const handleCreateFestival = async (formData: FormData) => {
    try {
      await createFestivalMutation.mutateAsync(formData);
      router.push("/dashboard/festivals");
      toast.success("Мероприятие успешно создано");
    } catch (error) {
      toast.error("Ошибка при создании мероприятия");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl w-full border-border border p-6 md:p-10">
      <h1 className="text-2xl font-semibold">Создать Мероприятие</h1>
      <FestivalForm onSubmit={handleCreateFestival} />
    </div>
  );
};

export default FestivalCreate;
