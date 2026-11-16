import { apiInstance } from "api/api-instance";
import { AxiosError } from "axios";
import { TStandApplication } from "shared/types/types";

export const festchStandApplications = async (festivalId?: string) => {
  const response = await apiInstance.get(
    `festival/stand-applications/?festival=${festivalId || ""}`
  );
  return response.data as TStandApplication[];
};

export const festchApplications = async () => {
  const response = await apiInstance.get(`festival/applications/`);
  return response.data as TStandApplication[];
};

export const createStandApplication = async (
  newData: TStandApplication
): Promise<TStandApplication> => {
  try {
    const response = await apiInstance.post(
      `festival/stand-applications-create/`,
      newData
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

export const deleteStandApplication = async (
  id: TStandApplication["id"]
): Promise<void> => {
  try {
    const response = await apiInstance.delete(
      `/festival/stand-applications/${id}/`
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const confirmStandApplication = async (
  id: TStandApplication["id"]
): Promise<void> => {
  try {
    const response = await apiInstance.put(
      `/festival/stand-applications/${id}/`,
      {}
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
