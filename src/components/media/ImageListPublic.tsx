"use client";

import React, { useState, useEffect } from "react";
import { useMediaFiles } from "api/media/queries";
import Image from "next/image";
import { useParams } from "next/navigation";
import { TMediaFile } from "shared/types/types";
import { getImageURL } from "../lib/utils";
import { SkeletonImageGrid } from "@/components/skeletons/skeletons";
import { Button } from "../ui/button";

const ImageListPublic = () => {
  const { id } = useParams() as { id: string };
  const { data: mediaFiles, isLoading, error } = useMediaFiles(id);
  const [selectedImage, setSelectedImage] = useState<TMediaFile | null>(null);

  const [bgAnimation, setBgAnimation] = useState("opacity-0");
  const [contentAnimation, setContentAnimation] =
    useState("opacity-0 scale-90");

  useEffect(() => {
    if (selectedImage) {
      setTimeout(() => {
        setBgAnimation("opacity-100");
        setContentAnimation("opacity-100 scale-100");
      }, 0);
    }
  }, [selectedImage]);

  if (isLoading) {
    return <SkeletonImageGrid />;
  }

  if (error || !mediaFiles) {
    return <div>{error?.message}</div>;
  }

  const filteredMedia = mediaFiles.filter(
    (media: TMediaFile) => media.file_type === "image"
  );

  const handleImageClick = (item: TMediaFile) => {
    setBgAnimation("opacity-0");
    setContentAnimation("opacity-0 scale-90");
    setSelectedImage(item);
  };

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setBgAnimation("opacity-0");
    setContentAnimation("opacity-0 scale-90");

    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  return (
    <div>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {filteredMedia.map((item: TMediaFile) => (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid rounded-md overflow-hidden cursor-pointer"
            onClick={() => handleImageClick(item)}
          >
            <Image
              src={getImageURL(item.file) || ""}
              alt={`Image ${item.id}`}
              width={600}
              height={400}
              loading="lazy"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300 ${bgAnimation}`}
          onClick={handleCloseModal}
        >
          <div
            className={`relative transition-all duration-300 ${contentAnimation}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageURL(selectedImage.file) || ""}
              alt={`Image ${selectedImage.id}`}
              width={1200}
              height={800}
              objectFit="contain"
              className="rounded-md"
            />
            <Button
              variant={"ghost"}
              className="absolute w-10 h-10 rounded-full top-2 right-2 text-white text-2xl bg-transparent border-none"
              onClick={handleCloseModal}
            >
              &times;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageListPublic;
