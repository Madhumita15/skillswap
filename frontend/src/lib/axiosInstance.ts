import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json"
  }
});


axiosInstance.interceptors.request.use(
  (config)=>{
    const token = getCookie("accessToken")
    console.log("token", token)
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config

  },
  (error)=>{
    return Promise.reject(error)
  }
)


const forceLogout = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken")
  window.location.href = "/login";
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401  &&
      !originalRequest._retry
    ) {
      console.log("error in interceptor", error.response);
      originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        // console.log("token avaliable...");
        // const formdata = new FormData();
        // formdata.append("refreshToken", refreshToken);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
            {refreshToken}
          );
          console.log("refresh token response", response);
          const newaccessToken = response?.data?.accessToken;
          setCookie("accessToken", newaccessToken);
          originalRequest.headers.Authorization = `Bearer ${newaccessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log("error", error);
          forceLogout();
          return Promise.reject(error)
        }
      } else {
        forceLogout();
         return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
);










//for http only cookie that set from backend


// const refreshInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
//   withCredentials: true,
// });


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


// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("originalRequest", originalRequest);
//     if (
//       error.response.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         await refreshInstance.post("/auth/refresh-token");
//         return axiosInstance(originalRequest);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   },
// );
