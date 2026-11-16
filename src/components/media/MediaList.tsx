"use client";

import { useMediaFiles } from "api/media/queries";
import { TMediaFile } from "shared/types/types";
import ImageList from "./ImageList";
import VideoList from "./VideoList";
import { useParams } from "next/navigation";

const MediaList = ({ tab = "images" }: { tab: string }) => {
  const { id } = useParams() as { id: string };
  const { data: mediaFiles, isLoading, error } = useMediaFiles(id);

  if (isLoading) return <div>Загрузка...</div>;
  if (error || !mediaFiles)
    return <div>{error?.message || "Ошибка загрузки медиа"}</div>;

  // Filter media based on the selected tab.
  const filteredMedia = mediaFiles.filter((media: TMediaFile) =>
    tab === "images" ? media.file_type === "image" : media.file_type === "video"
  );

  return (
    <div className="w-full">
      {tab === "images" ? (
        <ImageList mediaFiles={filteredMedia} />
      ) : (
        <VideoList mediaFiles={filteredMedia} />
      )}
    </div>
  );
};

export default MediaList;
