import { axiosInstance } from "@/lib/axiosInstance";
import { getErrorMessage } from "../global.helper";
import { ENDPOINT } from "../endPoint";

export const getDiscovery = async ({
  page,
  limit,
  signal,
  search,
  experience,
  teachingSkill,
  learningSkill,
}: {
  page: number;
  limit: number;
  signal: AbortSignal;
  search: string;
  experience: string;
  teachingSkill: string;
  learningSkill: string;
}) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINT.user.discover}?name=${search}&experience=${experience}&teachingSkills=${teachingSkill}&learningSkills=${learningSkill}`,
      { params: { page: page, limit: limit }, signal },
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const getMyMatch = async () => {
  try {
    const response = await axiosInstance.get(`${ENDPOINT.user.match}`);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
