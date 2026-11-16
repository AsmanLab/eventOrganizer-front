"use client";

import EventLayoutsList from "@/components/event-layouts/EventLaypoutsList";
import Loading from "@/components/loading";
import { useEventLayouts } from "api/event-layouts/queries";

const EventLayouts = () => {
  const { data: eventLayouts, isLoading, error } = useEventLayouts();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="w-full">
      <h1 className="text-xl font-medium mb-4">
        Планировки зала
      </h1>
      <EventLayoutsList data={eventLayouts || []} />
    </div>
  );
};

export default EventLayouts;
