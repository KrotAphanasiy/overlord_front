import { GasStation, GasStationTerminal } from "./types";

export const getGasStationData = (gasStation: GasStation) => ({
  id: gasStation.id,
  Имя: gasStation.name,
  "Дата создания": gasStation.createdDate,
  "Дата изменения": gasStation.updatedDate,
});

export const getTerminalData = (terminal: GasStationTerminal) => ({
  id: terminal.id,
  Имя: terminal.name,
  Код: terminal.code,
  Описание: terminal.description,
  "Дата создания": terminal.createdDate,
  "Дата изменения": terminal.updatedDate,
  "gasStationId": terminal.gasStationId
});
