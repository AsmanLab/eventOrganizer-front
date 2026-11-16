// app/event-layout/page.tsx
"use client";

import { useParams } from "next/navigation";
import EventLayoutForm from "@/components/event-layouts/EventLayoutForm";
import { useEventLayoutById } from "api/event-layouts/queries";

const EventLayoutPage = () => {
  const { id } = useParams() as { id: string };

  const { data, isLoading, error } = useEventLayoutById(Number(id));

  if (isLoading) {
    return <div>Загрузка данных..</div>;
  }
  if (error || !data) {
    return <div>Ошибка загрузки данных.</div>;
  }

  return <EventLayoutForm initialData={data} isAdmin={true} />;
};

export default EventLayoutPage;
