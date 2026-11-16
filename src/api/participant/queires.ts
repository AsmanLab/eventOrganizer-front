import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createParticipant,
  fetchVisitors,
  fetchVisitPurposes,
} from "./fetchers";
import { toast } from "sonner";
import { TParticipant, TParticipantDetails } from "shared/types/participant";
import { TParticipantFormData } from "@/schemas/participant-schema";
import { AxiosError } from "axios";

enum QueryKeys {
  VISIT_PURPOSES = "visit-purposes-list",
  VISITORS = "vistors-list",
}

export const useVisitPurposes = () =>
  useQuery({
    queryKey: [QueryKeys.VISIT_PURPOSES],
    queryFn: fetchVisitPurposes,
  });

export const useVisitors = (festivalId?: string) =>
  useQuery<TParticipantDetails[]>({
    queryKey: ["VISITORS", { festivalId }],
    queryFn: () => fetchVisitors(festivalId),
    enabled: Boolean(festivalId),
  });

export const useCreateParticipant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newParticipant: TParticipantFormData) =>
      createParticipant(newParticipant),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.VISITORS] });
      toast.success("Заявка успешно отправлена");
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { detail: string })?.detail ||
          "Ошибка при отправке заявки"
      );
    },
  });
};
