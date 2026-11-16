import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TStandApplication } from "shared/types/types";
import {
  confirmStandApplication,
  createStandApplication,
  deleteStandApplication,
  festchStandApplications,
} from "./fetchers";
import { toast } from "sonner";

enum QueryKeys {
  STANDS = "stands-list",
}

export const useStandApplications = (festivalId?: string) =>
  useQuery<TStandApplication[]>({
    queryKey: [QueryKeys.STANDS, { type: festivalId }],
    queryFn: () => festchStandApplications(festivalId),
  });

export const useCreateStandApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData: TStandApplication) => createStandApplication(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STANDS] });
      toast.success("Заявка успешно отправлена");
    },
    onError: (error) => {
      toast.error(error.message || "Ошибка при отправке заявки");
    },
  });
};

export const useDeleteStandApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TStandApplication["id"]) => deleteStandApplication(id),
    onSuccess: () => {
      toast.success("Успешно удален");
    },
    onError: () => {
      toast.error("Ошибка при удалении");
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STANDS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STANDS, id] });
    },
  });
};

export const useConfirmStandApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TStandApplication["id"]) => confirmStandApplication(id),
    onSuccess: () => {
      toast.success("Статус успешно обновлен");
    },
    onError: () => {
      toast.error("Ошибка при обновлении статуса");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STANDS] });
    },
  });
};
