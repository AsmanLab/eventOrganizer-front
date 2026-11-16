"use client";

import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import SelectFestival from "@/components/SelectFestival";
// import { useSpeakers } from "api/speaker/queries";
import { columns } from "./columns";
import { useStandApplications } from "api/stands/queries";
import { SkeletonDataTable } from "@/components/skeletons/skeletons";

export default function StandApplicationsPage() {
  const searchParams = useSearchParams();
  const festivalId = searchParams.get("festival") ?? "";

  const { data: speakers, isLoading, error } = useStandApplications(festivalId);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">Заявки на стенды</h1>
        <SelectFestival />
      </div>
      <div className="mt-4">
        {isLoading ? (
          <SkeletonDataTable />
        ) : error || !speakers ? (
          <p>Ошибка загрузки данных</p>
        ) : (
          <DataTable columns={columns} data={speakers} />
        )}
      </div>
    </div>
  );
}
