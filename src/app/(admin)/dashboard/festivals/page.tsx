"use client";

import { useState } from "react";
import FestivalList from "@/components/festivals/FestivalList";
import { Button } from "@/components/ui/button";
import { useFestivals } from "api/festivals/queries";
import Link from "next/link";
import { TFestival } from "shared/types/festivals";

const Festivals = () => {
  const { data: festivals, isLoading, error } = useFestivals();
  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error && !festivals) {
    return <div>{error.message}</div>;
  }

  const now = new Date();

  const filteredFestivals = festivals.filter((festival: TFestival) => {
    const festivalEndDate = new Date(festival.end_date);
    if (filter === "upcoming") {
      return festivalEndDate >= now;
    }
    if (filter === "completed") {
      return festivalEndDate < now;
    }
    return true;
  });

  return (
    <div className="w-full">
      <h1 className="text-xl font-medium mb-4">Мероприятия</h1>
      <div className="my-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Все
          </Button>
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            onClick={() => setFilter("upcoming")}
          >
            Предстоящие
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Завершенные
          </Button>
        </div>
        <Link href={"/dashboard/festivals/new"} className="justify-end">
          <Button
            size={"lg"}
            className="bg-admin-primary hover:bg-admin-primary/85"
          >
            + Добавить
          </Button>
        </Link>
      </div>

      {filteredFestivals.length > 0 ? (
        <FestivalList festivals={filteredFestivals} />
      ) : (
        <div className="wrapper">Нет данных</div>
      )}
    </div>
  );
};

export default Festivals;
