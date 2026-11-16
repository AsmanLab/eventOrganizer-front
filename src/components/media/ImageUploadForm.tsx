"use client";

import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMediaUpload } from "./useMediaUpload";
import { X } from "lucide-react";
import { useParams } from "next/navigation";

const MAX_SIZE = 10 * 1024 * 1024; // 5 MB

export default function ImageUploadForm() {
  const { id } = useParams() as { id: string };
  const [files, setFiles] = useState<File[]>([]);
  const { imageState, uploadImages } = useMediaUpload({ festivalId: id });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    if (imageFiles.length !== acceptedFiles.length) {
      alert("Допускаются только файлы изображений.");
    }
    setFiles(imageFiles);
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((err) => {
        if (err.code === "file-too-large") {
          alert(`Файл ${file.name} превышает лимит по размеру (10 MB).`);
        } else {
          alert(`Ошибка загрузки файла ${file.name}: ${err.message}`);
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { "image/*": [] },
    maxSize: MAX_SIZE,
  });

  const handleRemoveFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Пожалуйста, выберите файлы изображений.");
      return;
    }
    await uploadImages(files);
    setFiles([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Загрузить изображения</CardTitle>
        <CardDescription>
          Перетащите изображения или нажмите, чтобы выбрать файлы.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className="cursor-pointer border-2 border-admin-primary border-dashed p-4 h-52 flex-center text-center text-gray-400"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Перетащите изображения сюда...</p>
          ) : (
            <p>Перетащите изображения сюда или нажмите, чтобы выбрать файлы</p>
          )}
        </div>
        {files.length > 0 && (
          <ul className="mt-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between pb-1"
              >
                <span>{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs p-0 w-6 h-6 hover:bg-red-100 hover:text-red-700 rounded-full"
                  onClick={() => handleRemoveFile(file.name)}
                >
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Button
          size={"lg"}
          onClick={handleSubmit}
          disabled={imageState.uploading}
          className="bg-main-blue hover:bg-main-blue/85"
        >
          {imageState.uploading ? "Загрузка..." : "Отправить изображения"}
        </Button>
        {/* {imageState.success && (
          <p className="block text-green-600 mt-2">
            Изображения успешно загружены!
          </p>
        )}
        {imageState.error && (
          <p className="block text-red-600 mt-2">{imageState.error}</p>
        )} */}
      </CardFooter>
    </Card>
  );
}
