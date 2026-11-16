"use client";

import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import SelectFestival from "@/components/SelectFestival";

import { SkeletonDataTable } from "@/components/skeletons/skeletons";
import { useVisitors } from "api/participant/queires";
import { columns } from "./columns";

export default function VisitorsPage() {
  const searchParams = useSearchParams();
  const festivalId = searchParams.get("festival") ?? "";

  const { data: visitors, isLoading, error } = useVisitors(festivalId);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">Посетители</h1>
        <SelectFestival />
      </div>
      <div className="mt-4">
        {isLoading ? (
          <SkeletonDataTable />
        ) : !festivalId ? (
          <p>Вам нужно выбрать мероприятие</p>
        ) : error || !visitors ? (
          <p>Ошибка загрузки данных</p>
        ) : (
          <DataTable columns={columns} data={visitors} />
        )}
      </div>
    </div>
  );
}
