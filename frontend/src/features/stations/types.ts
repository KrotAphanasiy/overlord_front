export interface GasStation {
  name: string;
  gasPumpCount: number;
  id: number;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface GasStationTerminal {
  name: string;
  id: number;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  code?: string | null;
  gasStationId: number;
  description?: string | null;
}

export interface NewGasStationTerminal extends GasStationTerminal {
  isNew: boolean;
}
