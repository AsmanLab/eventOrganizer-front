import { AxiosError } from "axios";
import { apiInstance } from "api/api-instance";
import { TFestival, TFestivalDto } from "shared/types/festivals";

export const fetchFestivals = async () => {
  const response = await apiInstance.get("/festival/festivals-list/");
  return response.data;
};

export const fetchFestivalById = async (
  id: TFestival["id"]
): Promise<TFestivalDto> => {
  try {
    const response = await apiInstance.get(`/festival/festivals/${id}`);
    const data: TFestivalDto = response.data;
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

export const createFestival = async (
  newFestival: FormData
): Promise<TFestival> => {
  try {
    const response = await apiInstance.post(
      "/festival/festivals/",
      newFestival,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteFestival = async (id: TFestival["id"]): Promise<void> => {
  try {
    const response = await apiInstance.delete(
      `/festival/festivals-update-delete/${id}/`
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateFestival = async (
  id: TFestival["id"],
  updatedData: FormData
): Promise<TFestival> => {
  try {
    const response = await apiInstance.patch(
      `/festival/festivals-update-delete/${id}/`,
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
