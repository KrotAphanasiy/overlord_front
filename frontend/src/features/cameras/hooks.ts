import useSWR from "swr";
import { CommonResponse } from "types";
import { getCameras } from "./api";
import { Camera } from "./types";

export const useCameras = () => {
  const { data, error } = useSWR<CommonResponse<Camera[]>>(
    getCameras.key,
    getCameras.fetcher
  );

  if (data) return { data: data.data, error };
  return { data, error };
};
