import { apiInstance } from "api/api-instance";
import { AxiosError } from "axios";
import { TSponsor } from "shared/types/sponsor";

export const fetchSponsors = async (festivalId?: string) => {
  const response = await apiInstance.get(
    `/festival/sponsors/?festival=${festivalId || ""}`
  );
  return response.data as TSponsor[];
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

export const createSponsor = async (
  newSponsor: FormData
): Promise<TSponsor> => {
  try {
    const response = await apiInstance.post(
      "/festival/sponsors/create/",
      newSponsor,
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

export const updateSponsor = async (
  id: TSponsor["id"],
  updatedData: FormData
): Promise<TSponsor> => {
  try {
    const response = await apiInstance.put(
      `/festival/sponsors/${id}/`,
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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

export const deleteSponsor = async (id: TSponsor["id"]): Promise<void> => {
  try {
    const response = await apiInstance.delete(`/festival/sponsors/${id}/`);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const confirmSponsor = async (id: string) => {
  try {
    const response = await apiInstance.patch(
      `/festival/sponsors/${id}/confirm/`,
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
