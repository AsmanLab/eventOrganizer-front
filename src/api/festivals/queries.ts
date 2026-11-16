import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFestival,
  deleteFestival,
  fetchFestivalById,
  fetchFestivals,
  updateFestival,
} from "./fetchers";
import { TFestival, TFestivalDto } from "shared/types/festivals";
import { toast } from "sonner";

enum QueryKeys {
  FESTIVALS = "festivals-list",
}

export const useFestivals = () =>
  useQuery({
    queryKey: [QueryKeys.FESTIVALS],
    queryFn: fetchFestivals,
  });

export const useFestivalById = (id: string) =>
  useQuery<TFestivalDto>({
    queryKey: [QueryKeys.FESTIVALS, id],
    queryFn: () => fetchFestivalById(id),
  });

export const useCreateFestival = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newFestival: FormData) => createFestival(newFestival),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FESTIVALS] });
    },
  });
};

export const useDeleteFestival = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TFestival["id"]) => deleteFestival(id),
    onSuccess: () => {
      toast.success("Мероприятие успешно удалено");
    },
    onError: () => {
      toast.error("Ошибка при удалении мероприятия");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FESTIVALS] });
    },
  });
};

export const useUpdateFestival = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: TFestival["id"];
      updatedData: FormData;
    }) => updateFestival(id, updatedData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FESTIVALS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FESTIVALS, id] });
    },
    onError: (error) => {
      return error;
    },
  });
};
