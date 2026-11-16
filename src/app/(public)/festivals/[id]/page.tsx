"use client";

import { formatDate, getImageURL } from "@/components/lib/utils";
import Image from "next/image";
import { useFestivalInfo } from "@/components/providers/FestivalInfoProvider";
const markdownit = require("markdown-it");

const md = markdownit();

const FestivalDetail = () => {
  const festival = useFestivalInfo();
  const parsedContent = md.render(festival.description);

  return (
    <>
      <div className="mb-20">
        {/* Top Image */}
        <div className="relative bg-main-blue/5 w-full max-w-5xl h-[300px] sm:h-[360px] md:h-[460px] rounded-3xl overflow-hidden mx-auto">
          <Image
            src={getImageURL(festival.image) || ""}
            alt={festival.title || "Festival Image"}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
          />
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto mt-8 md:mt-10 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Text Content */}
            <div className="md:col-span-2">
              <div className="flex justify-between flex-wrap gap-4">
                <div className="font-medium text-gray-500">
                  {formatDate(festival.start_date)} -{" "}
                  {formatDate(festival.end_date)}
                </div>
                <div className="font-medium text-gray-500">
                  {festival.location}
                </div>
              </div>
              <h2 className="text-3xl font-semibold mt-4 text-slate-700">
                {festival.title}
              </h2>
              <div>
                {parsedContent ? (
                  <article
                    className="prose max-w-4xl break-all"
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                  />
                ) : (
                  <p className="no-result">No details provided</p>
                )}
              </div>
            </div>

            {/* Sticky Aside */}
            <div className="md:col-span-1 h-full">
              <div className="sticky top-24">
                <div className="bg-white p-6 shadow-custom2 rounded-lg flex flex-col gap-4">
                  <div>
                    <span className="text-3xl md:text-4xl font-bold text-main-red">
                      1500
                    </span>
                    <p className="font-semibold">Посетителей</p>
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-bold text-main-red">
                      20
                    </span>
                    <p className="font-semibold">Компаний</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalDetail;
