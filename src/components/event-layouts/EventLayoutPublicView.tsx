"use client";

// import { useParams } from "next/navigation";

import { useEventLayoutById } from "api/event-layouts/queries";
import EventLayoutForm from "@/components/event-layouts/EventLayoutForm";
import { useEffect } from "react";
import SkeletonEventLayout from "./SkeletonEventLayout";

const EventLayoutPublicView = ({ festivalId }: { festivalId: string }) => {
  const { data, isLoading, error, refetch } = useEventLayoutById(
    Number(festivalId)
  );

  useEffect(() => {
    refetch();
  }, [festivalId, refetch]);

  if (isLoading) {
    return <SkeletonEventLayout />;
  }
  if (error || !data) {
    return <div>Ошибка загрузки данных.</div>;
  }

  return <EventLayoutForm initialData={data} isAdmin={false} />;
};

export default EventLayoutPublicView;
