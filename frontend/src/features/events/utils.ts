import moment from 'moment';

import { Event } from "./types";

export const getEventData = (event: Event) => ({
  "Имя региона": event.cameraRegionName,
  "Дата редактирования": event.updatedDate && moment.utc(event.updatedDate).local().locale('ru').format('LLL LTS'),
  "Дата создания": event.createdDate && moment.utc(event.createdDate).local().locale('ru').format('LLL LTS'),
  "Временная метка": event.timestamp && moment.utc(event.timestamp).local().locale('ru').format('LLL LTS'),
  "ID станции": event.gasStationId,
  "ID детектора": event.cameraId,
  "ID региона": event.cameraRegionId,
  "Автомобильный номер": event.plateNumber,
});

export const getShortEventData = (event: Event) => ({
  "Имя региона": event.cameraRegionName,
  "Дата редактирования": event.updatedDate && moment.utc(event.updatedDate).local().locale('ru').format('LLL LTS'),
  "Дата создания": event.createdDate && moment.utc(event.createdDate).local().locale('ru').format('LLL LTS'),
  "Автомобильный номер": event.plateNumber,
});
