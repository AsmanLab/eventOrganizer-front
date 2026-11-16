"use client";

import { useMediaFiles } from "api/media/queries";
import { useParams } from "next/navigation";
import { TMediaFile } from "shared/types/types";
import { extractYouTubeId } from "../lib/utils";
import { SkeletonVideoList } from "../skeletons/skeletons";

const VideoListPublic = () => {
  const { id } = useParams() as { id: string };
  const { data: mediaFiles, isLoading, error } = useMediaFiles(id);

  if (isLoading) {
    return <SkeletonVideoList />;
  }

  if (error || !mediaFiles) {
    return <div>{error?.message || "Error loading media"}</div>;
  }

  const filteredMedia = mediaFiles.filter(
    (media: TMediaFile) => media.file_type === "video"
  );

  if (filteredMedia.length < 1) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        key={filteredMedia[0].id}
        className="lg:col-span-2 lg:row-span-2 relative w-full aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-custom"
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${extractYouTubeId(
            filteredMedia[0].video_link || ""
          )}`}
          title={filteredMedia[0].id}
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {filteredMedia.slice(1).map((item: TMediaFile) => (
        <div
          key={item.id}
          className="relative w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-custom"
        >
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeId(
              item.video_link || ""
            )}`}
            title={`Video ${item.id}`}
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default VideoListPublic;
