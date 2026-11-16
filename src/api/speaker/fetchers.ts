import { apiInstance } from "api/api-instance";
import { AxiosError } from "axios";
import { TSpeaker } from "shared/types/speaker";

export const fetchSpeakers = async (festivalId?: string) => {
  const response = await apiInstance.get(
    `/festival/speakers/?festival=${festivalId || ""}`
  );
  return response.data as TSpeaker[];
};

export const fetchSpeakerById = async (
  id: TSpeaker["id"]
): Promise<TSpeaker> => {
  try {
    const response = await apiInstance.get(`/festival/speakers/${id}`);
    const data: TSpeaker = response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const createSpeaker = async (
  newSponsor: FormData
): Promise<TSpeaker> => {
  try {
    const response = await apiInstance.post(`festival/speakers/`, newSponsor, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const updateSpeaker = async (
  id: TSpeaker["id"],
  updatedData: FormData
): Promise<TSpeaker> => {
  try {
    const response = await apiInstance.put(
      `/festival/speakers/${id}/`,
      updatedData
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const confirmSpeaker = async (id: string) => {
  try {
    const response = await apiInstance.patch(
      `/festival/speakers/${id}/confirm/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteSpeaker = async (id: TSpeaker["id"]): Promise<void> => {
  try {
    const response = await apiInstance.delete(`/festival/speakers/${id}/`);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
