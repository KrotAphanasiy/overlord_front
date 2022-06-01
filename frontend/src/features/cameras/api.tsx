import http from "lib/http";
import { StandartLoadRequest } from "lib/swr";
import { CommonResponse } from "types";
import { Camera, Region, CameraEdit, NewRegion } from "./types";
import {GasStationTerminal} from "../stations";

export const getCameras = new StandartLoadRequest<CommonResponse<Camera[]>>("Camera", (key) =>
  http.get<CommonResponse<Camera[]>>(key).then((res) => res.data)
);

export const getCameraById = new StandartLoadRequest<CommonResponse<Camera>, (id: Camera["id"]) => string>(
  (id) => `Camera/${id}`,
  (key) => http.get<CommonResponse<Camera>>(key).then((res) => res.data)
);

export const getCamerasForGasStation = (id: number) : Promise<any> =>
    http.get<CommonResponse<Camera[]>>(`Camera/station/${id}`).then((res) => res.data)


export const getCamera = (id: string) => http.get<CommonResponse<Camera>>(`Camera/${id}`);

export const createRegion = (region: Region | NewRegion) => http.post("CameraRegion", region);

export const updateRegion = (region: Region | NewRegion) => http.put(`CameraRegion/${region.id}`, region);

export const deleteRegion = (region: Region) => http.delete(`CameraRegion/${region.id}`);

export const updateCameraData = (id: Camera["id"], cameraData: Partial<CameraEdit>) => http.put(`Camera/${id}`, cameraData);

export const createCamera = (camera: Omit<Camera, 'regions'>) => http.post<CommonResponse<Camera>>("Camera", camera);
export const deleteCamera = (camera: Camera) => http.delete(`Camera/${camera.id}`);

export const getTerminal = async (id: number | undefined) => await http.get<CommonResponse<GasStationTerminal>>(`Terminal/${id}`).then((res) => res.data)
