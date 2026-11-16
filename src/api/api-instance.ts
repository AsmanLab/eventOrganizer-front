import axios from "axios";
import { authStore, getAccessToken } from "store/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiInstance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios interceptor for automatically attaching the access token.
 */
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      authStore.getState().logout();
      // originalRequest._retry = true;
      // try {
      //   const refreshToken = useAuthStore.getState().refreshToken;
      //   if (!refreshToken) throw new Error("No refresh token available");

      //   const { data } = await axios.post(`${BASE_URL}/user/refresh-token/`, {
      //     refresh_token: refreshToken,
      //   });

      //   useAuthStore.getState().signIn(data); // Update store with new tokens

      //   originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      //   return apiInstance(originalRequest);
      // } catch (refreshError) {
      //   useAuthStore.getState().logout(); // Logout user if refresh fails
      //   return Promise.reject(refreshError);
      // }
    }
    return Promise.reject(error);
  }
);

export { apiInstance, BASE_URL };
