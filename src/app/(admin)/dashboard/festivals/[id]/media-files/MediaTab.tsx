"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploadForm from "@/components/media/ImageUploadForm";
import VideoUploadForm from "@/components/media/VideoUploadForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function MediaUploadTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "images";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams();
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <Tabs
      value={tab}
      onValueChange={handleTabChange}
      className="w-full max-w-md"
    >
      <TabsList className="grid w-full grid-cols-2 h-12">
        <TabsTrigger value="images" className="h-10">
          Изображения
        </TabsTrigger>
        <TabsTrigger value="video" className="h-10">
          Видео
        </TabsTrigger>
      </TabsList>
      <TabsContent value="images">
        <ImageUploadForm />
      </TabsContent>
      <TabsContent value="video">
        <VideoUploadForm />
      </TabsContent>
    </Tabs>
  );
}
