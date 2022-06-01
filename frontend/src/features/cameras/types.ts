import { Optional } from 'types';

import { GasStation } from "features/stations";

export interface Camera {
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  id: string;
  name: string;
  connectionUrl: string;
  notes: string;
  apiKey: string;
  regions: Region[];
  gasStationId: GasStation["id"];
}

export interface CameraEdit extends Omit<Camera, 'regions'> {
  regions: (Region | NewRegion)[];
}

export interface Region {
  regionName: string;
  cameraId: string;
  topLeftX: number;
  topLeftY: number;
  bottomRightX: number;
  bottomRightY: number;
  terminalId?: number;
  id: number;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface NewRegion extends Optional<Region, 'isDeleted' | 'createdDate' | 'updatedDate' | 'cameraId'> {
  isNew?: boolean;
}
