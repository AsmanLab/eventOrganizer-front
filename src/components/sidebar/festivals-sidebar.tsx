"use client";

import { useFestivals } from "api/festivals/queries";
import { TFestival } from "shared/types/festivals";
import { formatDate } from "../lib/utils";
import Link from "next/link";

const FestivalSidebar = ({
  section = "video-gallery",
}: {
  section: string;
}) => {
  const { data: festivals, isLoading, error } = useFestivals();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error && !festivals) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <>
      {festivals.map((item: TFestival) => (
        <Link
          key={`festivals-sidbar-${item.id}`}
          href={`/festivals/${item.id}/${section}`}
        >
          <div className="p-3 hover:bg-slate-100 rounded-xl">
            <p className="text-sm text-gray-500">
              {formatDate(item.start_date)}
            </p>
            <h2 className="text-lg font-semibold text-main-blue">
              {item.title}
            </h2>
          </div>
        </Link>
      ))}
    </>
  );
};

export default FestivalSidebar;
