import SelectFestival from "@/components/SelectFestival";
// import SearchInput from "./SearchInput";
import { SponsorsTable } from "./SponsorsTable";
import { Suspense } from "react";
import { SkeletonDataTable } from "@/components/skeletons/skeletons";

export default async function SponsorsPage(props: {
  searchParams?: Promise<{
    festival?: string;
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const festivalId = searchParams?.festival || "";
  const searchValue = searchParams?.search || "";
  
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">Спонсоры</h1>
        <div className="flex gap-4 max-w-lg">
          <SelectFestival />
          {/* <SearchInput placeholder="Поиск..." /> */}
        </div>
      </div>
      <div className="mt-4">
        <Suspense key={festivalId} fallback={<SkeletonDataTable />}>
          <SponsorsTable festivalId={festivalId} searchValue={searchValue} />
        </Suspense>
      </div>
    </div>
  );
}
