import adminApi from "@/lib/config";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

export const useAxiosPrivate = () => {
  const { token, logout } = useAuthStore();

  useEffect(() => {
    // ✅ REQUEST
    const requestIntercept = adminApi.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ RESPONSE
    const responseIntercept = adminApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
        //   logout();
            //   window.location.href = "/login";
            console.log("INTERCEPTOR 401", error.response);

        }
        return Promise.reject(error);
      }
    );

    return () => {
      adminApi.interceptors.request.eject(requestIntercept);
      adminApi.interceptors.response.eject(responseIntercept);
    };
  }, [token, logout]);

  return adminApi;
};
