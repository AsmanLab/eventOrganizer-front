"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";

export type TJudge = {
  name: string;
  description: string;
  img: StaticImageData | null;
};

export const JudgeCard = ({
  judge,
  maxLength = 120,
}: {
  judge: TJudge;
  maxLength?: number;
}) => {
  const { name, img, description } = judge;
  const [isExpanded, setIsExpanded] = useState(false);

  const items = description
    .split(";")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const hasMoreText = description.length > maxLength;

  let truncatedDescription = items.join("; ").slice(0, maxLength);
  truncatedDescription += description.length > maxLength ? "..." : "";

  const toggleDescription = () => setIsExpanded((prev) => !prev);

  return (
    <div className="w-full p-2 rounded-2xl flex flex-col gap-3">
      <div className="w-[260px] h-[260px] bg-slate-100 relative rounded-2xl overflow-hidden">
        {img && (
          <Image
            src={img}
            alt={name}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      <div className="text-xl font-medium">{name}</div>
      <div className="text-pretty text-slate-500 max-w-sm">
        {hasMoreText ? (
          isExpanded ? (
            <ul className="list-disc ml-4">
              {items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="">{truncatedDescription}</p>
          )
        ) : (
          <p>{description}</p>
        )}
        {hasMoreText && (
          <Button
            variant={"link"}
            onClick={toggleDescription}
            className="pl-0 text-main-blue font-medium hover:underline self-start"
          >
            {isExpanded ? "Свернуть" : "Узнать больше"}
          </Button>
        )}
      </div>
    </div>
  );
};
