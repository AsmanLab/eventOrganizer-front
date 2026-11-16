import { apiInstance } from "api/api-instance";
import { AxiosError } from "axios";
import { TSponsor } from "shared/types/sponsor";
import { TMediaFile } from "shared/types/types";

export const fetchMediaFiles = async (id: string) => {
  const response = await apiInstance.get(`/festival/media/?festival_id=${id}`);
  return response.data;
};

export const createMediaFiles = async (
  newMediaFile: FormData
): Promise<void> => {
  try {
    const response = await apiInstance.post(
      "/festival/media/create/",
      newMediaFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    // if (error instanceof AxiosError) {
    //   const errorMessage =
    //     error.response?.data?.error ||
    //     error.message ||
    //     "Unknown error occurred";
    //   throw new Error(errorMessage);
    // }
    throw error;
  }
};

export const deleteMediaFile = async (id: TMediaFile["id"]): Promise<void> => {
  try {
    const response = await apiInstance.delete(`/festival/media/${id}/`);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const fetchSponsorById = async (
  id: TSponsor["id"]
): Promise<TSponsor> => {
  try {
    const response = await apiInstance.get(`/festival/sponsors/${id}`);
    const data: TSponsor = response.data;
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
