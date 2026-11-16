import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEventLayout,
  fetchEventLayoutId,
  fetchEventLayouts,
  updateEventLayout,
  updateEventLayoutBgImage,
} from "./fetchers";
import { toast } from "sonner";
import { TEventLayoutDto } from "shared/types/event-layout";
import { TEventLayoutFormData } from "@/components/forms/event-layout/useEventLayoutForm";

enum QueryKeys {
  LAYOUTS = "event-layouts-dashboard",
  FESTIVALS = "festivals-list",
}

export const useEventLayouts = () =>
  useQuery({
    queryKey: [QueryKeys.LAYOUTS],
    queryFn: fetchEventLayouts,
  });

export const useEventLayoutById = (id: number) =>
  useQuery<TEventLayoutDto>({
    queryKey: [QueryKeys.LAYOUTS, id],
    queryFn: () => fetchEventLayoutId(id),
  });

export const useCreateEventLayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      newEventLayout,
      festivalId,
    }: {
      newEventLayout: TEventLayoutFormData;
      festivalId: string;
    }) => createEventLayout(newEventLayout, festivalId),
    onSuccess: (_d, { festivalId }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LAYOUTS] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FESTIVALS, festivalId],
      });
      toast.success("Заявка успешно отправлена");
    },
    onError: () => {
      toast.error("Ошибка при отправке заявки");
    },
  });
};

export const useUpdateEventLayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updatedData }: { updatedData: TEventLayoutDto }) =>
      updateEventLayout(updatedData),
    onSuccess: () => {
      toast.success("Событие успешно обновлено");
    },
    onError: (error) => {
      toast.error("Ошибка обновления события");
      return error;
    },
    onSettled: (data, _error) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LAYOUTS] });
      if (data) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.LAYOUTS, data?.id],
        });
      }
    },
  });
};

export const useUpdateEventLayoutBgImg = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedData: FormData) =>
      updateEventLayoutBgImage(updatedData),
    onSuccess: () => {
      toast.success("Событие успешно обновлено");
    },
    onError: (error) => {
      toast.error("Ошибка обновления события");
      return error;
    },
    onSettled: (_data, _error, updatedData) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LAYOUTS] });
      const id = updatedData.get("festival");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LAYOUTS, id],
      });
    },
  });
};
