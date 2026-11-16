"use client";

import SectionTitle from "@/components/home/SectionTitle";
import { formatDate, getImageURL, truncateText } from "@/components/lib/utils";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useFestivals } from "api/festivals/queries";
import Link from "next/link";
import { TFestival } from "shared/types/festivals";
import bgImgFestivalsList from "@/assets/bg-festivals-list.png";

const FestivalsPage = () => {
  const { data: festivals, isLoading, error } = useFestivals();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  if (error && !festivals) {
    return <div>{error.message}</div>;
  }

  return (
    <div
      className="max-container min-h-screen pt-8 pb-12 w-full px-4 sm:px-6 md:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImgFestivalsList.src})` }}
    >
      {/* List of Festivals */}
      <div className="flex flex-col gap-6 md:gap-8">
        {festivals.map((festival: TFestival) => (
          <div
            key={`festival-list-${festival.id}`}
            className="bg-white shadow-custom p-6 w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between rounded-3xl gap-4 md:gap-8"
          >
            <div
              className="w-full hidden sm:block flex-1 h-[200px] sm:h-[240px] md:h-[260px] mx-auto relative bg-main-blue/10 rounded-xl bg-cover bg-top"
              style={{ backgroundImage: `url(${getImageURL(festival.image)})` }}
            ></div>
            <div className="flex flex-1 flex-col h-full">
              <span className="text-lg font-medium text-slate-500">
                {formatDate(festival.start_date)}
              </span>
              <SectionTitle className="text-2xl sm:text-3xl md:text-4xl text-main-blue mt-2">
                {festival.title}
              </SectionTitle>
              <p className="text-slate-500 mt-2 md:mt-4">
                {truncateText(festival.short_description || "", 130)}
              </p>
              <Link href={`festivals/${festival.id}`} className="mt-6">
                <Button
                  size={"lg"}
                  className="w-max bg-main-red hover:bg-main-red/85"
                >
                  Смотреть
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalsPage;
