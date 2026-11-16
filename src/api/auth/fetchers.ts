// import { BasicResponse } from "@/services/common/types";
import { TSignInFormData } from "@/components/auth/login/sign-in-schema";
import { apiInstance } from "api/api-instance";
import { getRefreshToken } from "store/auth";

type TSignOutDto = {
  token: string | null;
};

export const authSignIn = async (credentials: TSignInFormData) => {
  try {
    const response = await apiInstance.post("/user/login-token/", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authSignOut = async () => {
  try {
    const tokenRequest: TSignOutDto = {
      token: getRefreshToken(),
    };

    const response = await apiInstance.post(
      "/user/logout-token/",
      tokenRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
