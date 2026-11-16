"use client";

import { TMediaFile } from "shared/types/types";
import DeleteMediaFileBtn from "./delete-media-file";
import { extractYouTubeId } from "../lib/utils";

interface VideoListProps {
  mediaFiles: TMediaFile[];
}

export default function VideoList({ mediaFiles }: VideoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mediaFiles.map((media: TMediaFile) => (
        <div
          key={`media-${media.id}`}
          className="relative aspect-video overflow-hidden rounded"
        >
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeId(
              media.video_link || ""
            )}`}
            title={`Video ${media.id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
          <DeleteMediaFileBtn id={media.id} />
        </div>
      ))}
    </div>
  );
}
