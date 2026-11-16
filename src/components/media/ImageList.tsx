"use client";

import { TMediaFile } from "shared/types/types";
import Image from "next/image";
import { getImageURL } from "@/components/lib/utils";
import DeleteMediaFileBtn from "./delete-media-file";

interface ImageListProps {
  mediaFiles: TMediaFile[];
}

export default function ImageList({ mediaFiles }: ImageListProps) {
  return (
    <div className="columns-3 md:columns-4 lg:columns-5 space-y-4">
      {mediaFiles.map((media: TMediaFile) => (
        <div
          key={`media-${media.id}`}
          className="mb-4 break-inside-avoid relative"
        >
          <div className="rounded-md overflow-hidden relative">
            <Image
              src={getImageURL(media.file) || ""}
              alt={`Media ${media.id}`}
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-md"
            />
            <DeleteMediaFileBtn id={media.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
