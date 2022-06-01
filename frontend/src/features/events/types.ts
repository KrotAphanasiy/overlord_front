export type Event = {
  createdDate: string;
  updatedDate: string;
  id: string;
  gasStationId: number;
  cameraId: string;
  cameraRegionId: number;
  cameraRegionName: string;
  timestamp: string;
  plateNumber: string;
  imageLink: string;
  processedImageLink: string;
};

export type EditableSettings = {
  id: number;
  settingsGroup: string;
  key: string;
  value: string;
}
