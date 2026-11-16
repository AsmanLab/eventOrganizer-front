"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaUpload } from "./useMediaUpload";
import { useParams } from "next/navigation";

const videoSchema = z.object({
  videoLink: z.preprocess(
    (val) => (val === null || val === "" ? undefined : val),
    z.string().url("Введите корректный URL для видео").optional()
  ),
});

interface Props {
  festivalId: string;
}

export default function VideoUploadForm() {
  const { id } = useParams() as { id: string };
  const { videoState, uploadVideo } = useMediaUpload({ festivalId: id });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ videoLink?: string }>({
    resolver: zodResolver(videoSchema),
  });

  const onSubmit = async (data: { videoLink?: string }) => {
    if (!data.videoLink) return;
    await uploadVideo(data.videoLink);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Отправить ссылку на видео {id}</CardTitle>
        <CardDescription>Введите ссылку на видео ниже.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="videoLink">Ссылка на видео</Label>
            <Input
              id="videoLink"
              //   type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              {...register("videoLink")}
              className="mt-1 h-11 focus-visible:ring-main-blue"
            />
            {errors.videoLink && (
              <p className="text-red-600 text-sm mt-1">
                {errors.videoLink.message}
              </p>
            )}
          </div>
          <Button
            size="lg"
            type="submit"
            disabled={videoState.uploading}
            className="bg-main-blue hover:bg-main-blue/85"
          >
            {videoState.uploading ? "Отправка..." : "Отправить видео"}
          </Button>
        </form>
        {videoState.success && (
          <p className="text-green-600 mt-2">Видео успешно отправлено!</p>
        )}
        {videoState.error && (
          <p className="text-red-600 mt-2">{videoState.error}</p>
        )}
      </CardContent>
    </Card>
  );
}
