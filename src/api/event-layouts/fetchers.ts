import { TEventLayoutFormData } from "@/components/forms/event-layout/useEventLayoutForm";
import { apiInstance } from "api/api-instance";
import { TEventLayoutDto } from "shared/types/event-layout";

export const fetchEventLayouts = async () => {
  const response = await apiInstance.get("/festival/event-layouts/");
  const data: TEventLayoutDto[] = response.data;
  return data;
};

export const fetchEventLayoutId = async (
  id: TEventLayoutDto["id"]
): Promise<TEventLayoutDto> => {
  try {
    const response = await apiInstance.get(`festival/event-layouts/${id}/`);
    const data: TEventLayoutDto = response.data;
    return data;
  } catch (error: unknown) {
    throw error;
  }
};

export const createEventLayout = async (
  newEventLayout: TEventLayoutFormData,
  festivalId: string
): Promise<TEventLayoutDto> => {
  try {
    const response = await apiInstance.post(
      `festival/event-layouts/create-update/`,
      { ...newEventLayout, festival: festivalId }
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateEventLayout = async (
  updatedData: TEventLayoutDto
): Promise<TEventLayoutDto> => {
  const updatedStands = updatedData.stands?.map((stand) => {
    if (stand.id <= 0) {
      const { id, ...standWithoutId } = stand;
      return standWithoutId;
    }
    return stand;
  });

  try {
    const response = await apiInstance.patch(
      `/festival/event-layouts/create-update/`,
      { ...updatedData, stands: updatedStands }
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateEventLayoutBgImage = async (
  updatedData: FormData
): Promise<TEventLayoutDto> => {
  try {
    const response = await apiInstance.patch(
      `/festival/event-layouts/create-update/`,
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
