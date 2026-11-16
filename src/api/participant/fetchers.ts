import { TParticipantFormData } from "@/schemas/participant-schema";
import { apiInstance } from "api/api-instance";
import { TParticipant, TParticipantDetails } from "shared/types/participant";

export const fetchVisitPurposes = async () => {
  const response = await apiInstance.get("/festival/visit_purposes_list/");
  return response.data;
};

export const fetchVisitors = async (festivalId?: string) => {
  const response = await apiInstance.get(
    `/festival/visitors/${festivalId || ""}`
  );
  return response.data as TParticipantDetails[];
};

export const createParticipant = async (
  newParticipant: TParticipantFormData
): Promise<TParticipant> => {
  try {
    const response = await apiInstance.post(
      `festival/register_visitor/${newParticipant.festival}/`,
      { ...newParticipant, visit_purposes_ids: newParticipant.visit_purposes }
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
