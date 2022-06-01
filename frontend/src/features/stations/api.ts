import http from "lib/http";
import { toInt } from "utils";
import { InfiniteLoadRequest, StandartLoadRequest } from "lib/swr";

import { CommonResponse } from "types";
import { Camera } from "features/cameras";
import { GasStation, GasStationTerminal } from "features/stations/types";

export const getGasStationsPaged = new InfiniteLoadRequest<
  CommonResponse<GasStation[]>,
  (pageNumber: number, pageSize?: number) => string
>(
  (pageNumber, pageSize = 4) =>
    `GasStation/paged?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`,
  (key: string) =>
    http.get<CommonResponse<GasStation[]>>(key).then((res) => res.data)
);

export const getGasStations = new StandartLoadRequest<
  CommonResponse<GasStation[]>
>("GasStation", (key) =>
  http.get<CommonResponse<GasStation[]>>(key).then((res) => res.data)
);

export const getGasStationsTerminals = new StandartLoadRequest<
  CommonResponse<GasStationTerminal[]>,
  (id: GasStation["id"]) => string
>(
  (id) => `Terminal?gasStationId=${id}`,
  (key) =>
    http.get<CommonResponse<GasStationTerminal[]>>(key).then((res) => res.data)
);

export const getGasStationsTerminalsAvailable = new StandartLoadRequest<
  CommonResponse<GasStationTerminal[]>,
  (id: GasStation["id"]) => string
>(
  (id) =>
    `Terminal/paged/available?gasStationId=${id}&pageNumber=1&pageSize=2147483640`,
  (key) =>
    http.get<CommonResponse<GasStationTerminal[]>>(key).then((res) => res.data)
);

export const getGasStationById = new StandartLoadRequest<
  CommonResponse<GasStation>,
  (id: GasStation["id"]) => string
>(
  (id) => `GasStation/${id}`,
  (key) => http.get<CommonResponse<GasStation>>(key).then((res) => res.data)
);

export const getGasStationCameras = new StandartLoadRequest<
  CommonResponse<Camera[]>,
  (id: GasStation["id"]) => string
>(
  (id) => `Camera/station/${id}`,
  (key) => http.get<CommonResponse<Camera[]>>(key).then((res) => res.data)
);

// TODO: update source endpoints
export const getGasStationAndTerminals = new StandartLoadRequest<
  { gasStation: GasStation; terminals: GasStationTerminal[] },
  (id: GasStation["id"]) => string
>(
  (id: GasStation["id"]) => `getGasStationAndTerminals.${id}`,
  (key) => {
    const id = toInt(key.split(".")[1]);

    return Promise.all([
      getGasStationById.fetcher(getGasStationById.key(id)),
      getGasStationsTerminals.fetcher(getGasStationsTerminals.key(id)),
    ]).then(([gasStationResult, terminalsResult]) => {
      console.log([gasStationResult, terminalsResult]);

      return {
        gasStation: gasStationResult.data,
        terminals: terminalsResult.data,
      };
    });
  }
);

export const getTerminals = (id: string) => http.get<CommonResponse<GasStationTerminal[]>>(
  `Terminal/paged/available?gasStationId=${id}&pageNumber=1&pageSize=2147483640`
  );

export const createGasStation = (gasStation: Partial<GasStation>) => {
  return http.post<CommonResponse<GasStation>>("GasStation", gasStation);
};

export const createTerminal = (terminal: Partial<GasStationTerminal>) =>
  http.post("Terminal", terminal);

export const updateGasStation = (gasStation: GasStation) =>
  http.put(`GasStation/${gasStation.id}`, gasStation);

export const updateTerminal = (terminal: GasStationTerminal) =>
  http.put(`Terminal/${terminal.id}`, terminal);

export const deleteGasStation = (gasStation: GasStation) =>
  http.delete(`GasStation/${gasStation.id}`).then((res) => res.data);

export const deleteTerminal = (terminal: GasStationTerminal) =>
  http.delete(`Terminal/${terminal.id}`);
