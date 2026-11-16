"use client";
import { Combobox } from "@/components/combobox";
import { useFestivals } from "api/festivals/queries";
import { useRouter, useSearchParams } from "next/navigation";
import { SkeletonFestivalSelect } from "./skeletons/skeletons";
import { TFestival } from "shared/types/festivals";

const SelectFestival = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("festival") || "";

  const { data: festivals, isLoading, error } = useFestivals();

  if (isLoading) return <SkeletonFestivalSelect />;
  if (error || !festivals) return <p>Ошибка загрузки данных</p>;

  const festivalOptions = [
    { value: "", label: "Все" },
    ...festivals.map((festival: TFestival) => ({
      value: `${festival.id}`,
      label: festival.title,
    })),
  ];

  const handleChange = (selected: string) => {
    router.replace(`?festival=${selected}`);
  };

  return (
    <Combobox
      options={festivalOptions || []}
      placeholder="Выберите мероприятие"
      value={currentType}
      onChange={handleChange}
      className="h-10 w-max bg-white border focus-visible:ring-main-blue"
    />
  );
};

export default SelectFestival;
