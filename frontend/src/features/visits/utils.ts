import moment from 'moment';

import { Visit } from "./types";

export const getShortVisitData = (visit: Visit) => ({
  Начало: visit.start && moment.utc(visit.start).local().locale('ru').format('LLL LTS'),
  Конец: visit.end && moment.utc(visit.end).local().locale('ru').format('LLL LTS'),
  "Количество снимков": visit.eventsCount,
  "Автомобильный номер": visit.plateNumber,
  "Название станции": visit.gasStationName,
});

export const getVisitData = (visit: Visit) => ({
  id: visit.id,
  Начало: visit.start && moment.utc(visit.start).local().locale('ru').format('LLL LTS'),
  Конец: visit.end && moment.utc(visit.end).local().locale('ru').format('LLL LTS'),
  "Количество снимков": visit.eventsCount,
  "Автомобильный номер": visit.plateNumber,
  "Id станции": visit.gasStationId,
  "Название станции": visit.gasStationName,
  "Дата создания": visit.createdDate,
  "Дата изменения": visit.updatedDate,
  "Ссылка на изображение": visit.fullImageLink,
  "Маска": visit.mask,
});
