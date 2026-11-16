"use client";

import { DataTable } from "@/components/data-table";
import { SkeletonDataTable } from "@/components/skeletons/skeletons";
import { useSponsors } from "api/sponsors/queries";
import { columns } from "./columns";

export const SponsorsTable = ({
  festivalId,
  searchValue,
}: {
  festivalId: string;
  searchValue: string;
}) => {
  const { data: sponsors, isLoading, error } = useSponsors(festivalId);

  return (
    <>
      {isLoading ? (
        <SkeletonDataTable />
      ) : error || !sponsors ? (
        <p>Ошибка загрузки данных</p>
      ) : (
        <DataTable columns={columns} data={sponsors} />
      )}
    </>
  );
};
