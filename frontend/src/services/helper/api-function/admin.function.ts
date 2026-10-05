import {axiosInstance} from "../../../lib/axiosInstance";
import { ENDPOINT } from "../endPoint";

export const getAdminDashboardStats = async () => {
  const response = await axiosInstance.get(
    ENDPOINT.dashboard.admin
  );

  return response.data;
};