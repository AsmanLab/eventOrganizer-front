import { useCreateMediaFile } from "api/media/queries";
import { useState } from "react";

interface UploadState {
  uploading: boolean;
  error: string | null;
  success: boolean | null;
}

interface Props {
  festivalId: string;
}

export function useMediaUpload({ festivalId }: Props) {
  const { mutateAsync } = useCreateMediaFile();
  const [imageState, setImageState] = useState<UploadState>({
    uploading: false,
    error: null,
    success: null,
  });
  const [videoState, setVideoState] = useState<UploadState>({
    uploading: false,
    error: null,
    success: null,
  });

  const uploadImages = async (files: File[]) => {
    if (files.length === 0) return;
    setImageState({ uploading: true, error: null, success: null });
    try {
      const formData = new FormData();
      formData.append("festival", festivalId);
      files.forEach((file) => formData.append("file", file, file.name));
      formData.append("file_type", "image");

      // Call the mutation function using mutateAsync
      await mutateAsync(formData);
      setImageState({ uploading: false, error: null, success: true });
    } catch (error: any) {
      setImageState({
        uploading: false,
        error: error.message || "Ошибка загрузки изображений.",
        success: false,
      });
    }
  };

  const uploadVideo = async (videoLink: string) => {
    if (!videoLink.trim()) return;
    setVideoState({ uploading: true, error: null, success: null });
    try {
      const formData = new FormData();
      formData.append("festival", festivalId);
      formData.append("file", "");
      formData.append("file_type", "video");
      formData.append("video_link", videoLink.trim());

      await mutateAsync(formData);
      setVideoState({ uploading: false, error: null, success: true });
    } catch (error: any) {
      setVideoState({
        uploading: false,
        error: error.message || "Ошибка отправки видео.",
        success: false,
      });
    }
  };

  return { imageState, uploadImages, videoState, uploadVideo };
}
