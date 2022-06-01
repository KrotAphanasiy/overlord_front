export type Visit = {
  createdDate: string;
  updatedDate: string;
  id: number;
  start: string;
  end: string;
  eventsCount: number;
  plateNumber: string;
  gasStationId: number;
  gasStationName: string;
  fullImageLink: string;
  mask: string;
};

export type EditableSettings = {
  id: number;
  settingsGroup: string;
  key: string;
  value: string;
}