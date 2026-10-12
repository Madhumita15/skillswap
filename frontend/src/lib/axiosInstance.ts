import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});


// when i will send request like /user/dashboard then it will send error if it is unauthorized like - 
// error.config = {
//   method: "get",
//   url: "/users/profile",
//   withCredentials: true,
//   headers: {
//     // Request headers
//   }
// };

// error.config: configuration of the failed Axios request.
// originalRequest: a variable holding that configuration.
// _retry: a custom flag used to prevent repeated retries.
// axiosInstance(originalRequest): retries the original request.


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("originalRequest", originalRequest);
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshInstance.post("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
