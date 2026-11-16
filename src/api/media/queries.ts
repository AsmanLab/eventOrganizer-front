import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMediaFiles, deleteMediaFile, fetchMediaFiles } from "./fetchers";
import { TMediaFile } from "shared/types/types";

enum QueryKeys {
  MEDIAS = "media-files",
}

export const useMediaFiles = (id: string) =>
  useQuery({
    queryKey: [QueryKeys.MEDIAS, { festival: id }],
    queryFn: () => fetchMediaFiles(id),
  });

export const useCreateMediaFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData: FormData) => createMediaFiles(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MEDIAS] });
      toast.success("Заявка успешно отправлена");
    },
    onError: () => {
      toast.error("Ошибка при отправке заявки");
    },
  });
};

// export const useDeleteMediaFile = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: TMediaFile["id"]) => deleteMediaFile(id),
//     onSuccess: () => {
//       toast.success("Файл удален");
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.MEDIAS] });
//     },
//     onError: () => {
//       toast.error("Ошибка при удалении файла");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.MEDIAS] });
//     },
//   });
// };

export const useDeleteMediaFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TMediaFile["id"]) => deleteMediaFile(id),
    onSuccess: (_, id) => {
      // Pessimistic update: wait for the server to confirm deletion,
      // then update the cache manually.
      queryClient.setQueryData<TMediaFile[]>([QueryKeys.MEDIAS], (old) =>
        old ? old.filter((media) => media.id !== id) : []
      );
      toast.success("Файл удален");
    },
    onError: () => {
      toast.error("Ошибка при удалении файла");
    },
    onSettled: () => {
      // As a fallback, re-fetch the media list.
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MEDIAS] });
    },
  });
};
