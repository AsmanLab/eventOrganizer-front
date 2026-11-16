import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  confirmSponsor,
  createSponsor,
  deleteSponsor,
  fetchSponsorById,
  fetchSponsors,
  updateSponsor,
} from "./fetchers";
import { TSponsor } from "shared/types/sponsor";
import { toast } from "sonner";

enum QueryKeys {
  SPONSORS = "sponsors",
}

export const useSponsors = (festivalId?: string) =>
  useQuery<TSponsor[]>({
    queryKey: [QueryKeys.SPONSORS, { type: festivalId }],
    queryFn: () => fetchSponsors(festivalId),
  });

export const useSponsorById = (id: TSponsor["id"]) =>
  useQuery({
    queryKey: [QueryKeys.SPONSORS, id],
    queryFn: () => fetchSponsorById(id),
    enabled: Boolean(id),
  });

export const useCreateSponsor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSponsor: FormData) => createSponsor(newSponsor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPONSORS] });
      toast.success("Заявка успешно отправлена");
    },
    onError: () => {
      toast.error("Ошибка при отправке заявки");
    },
  });
};

export const useUpdateSponsor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: TSponsor["id"];
      updatedData: FormData;
    }) => updateSponsor(id, updatedData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPONSORS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPONSORS, id] });
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useDeleteSponsor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TSponsor["id"]) => deleteSponsor(id),
    onSuccess: () => {
      toast.success("Спонсор успешно удален");
    },
    onError: () => {
      toast.error("Ошибка при удалении спонсора");
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPONSORS] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPONSORS, id] });
    },
  });
};

export const useConfirmSponsor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmSponsor,
    onSuccess: () => {
      toast.success("Статус успешно обновлен");
    },
    onError: () => {
      toast.error("Ошибка при обновлении статуса");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SPONSORS] });
    },
  });
};
