import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  confirmSpeaker,
  createSpeaker,
  deleteSpeaker,
  fetchSpeakerById,
  fetchSpeakers,
  updateSpeaker,
} from "./fetchers";
import { toast } from "sonner";
import { TSpeaker } from "shared/types/speaker";

enum QueryKeys {
  SPEAKERS = "speakers-list",
}

export const useSpeakers = (festivalId?: string) =>
  useQuery<TSpeaker[]>({
    queryKey: [QueryKeys.SPEAKERS, { type: festivalId }],
    queryFn: () => fetchSpeakers(festivalId),
  });

export const useSpeakerById = (id: string) =>
  useQuery<TSpeaker>({
    queryKey: [QueryKeys.SPEAKERS, id],
    queryFn: () => fetchSpeakerById(id),
  });

export const useCreateSpeaker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSpeaker: FormData) => createSpeaker(newSpeaker),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPEAKERS] });
      toast.success("Заявка успешно отправлена");
    },
    onError: () => {
      toast.error("Ошибка при отправке заявки");
    },
  });
};

export const useConfirmSpeaker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmSpeaker,
    onSuccess: () => {
      toast.success("Статус успешно обновлен");
    },
    onError: () => {
      toast.error("Ошибка при обновлении статуса");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPEAKERS] });
    },
  });
};

export const useDeleteSpeaker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TSpeaker["id"]) => deleteSpeaker(id),
    onSuccess: () => {
      toast.success("Спикер успешно удален");
    },
    onError: () => {
      toast.error("Ошибка при удалении спикера");
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPEAKERS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPEAKERS, id] });
    },
  });
};

export const useUpdateSpeaker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: TSpeaker["id"];
      updatedData: FormData;
    }) => updateSpeaker(id, updatedData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPEAKERS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPEAKERS, id] });
    },
    onError: (error) => {
      return error;
    },
  });
};
