import http from "lib/http";
import { InfiniteLoadRequest } from "lib/swr";
import { CommonResponse } from "types";
import {EditableSettings, Event} from "./types";

import queryString from 'query-string';

export const getEvents = new InfiniteLoadRequest<
  CommonResponse<Event[]>,
  (
    pageNumber: number,
    cameraId: string,
    startedAt: string,
    endedAt: string,
    pageSize?: number
  ) => string
>(
  (pageNumber, cameraId, startedAt, endedAt, pageSize = 4) =>
    queryString.stringifyUrl({
      url: 'RecognitionEvent/camera_events',
      query: {
        pageNumber:
        pageNumber + 1,
        pageSize,
        cameraUid: cameraId,
        startedAt,
        endedAt,
      }
    }),
  (key: string) =>
    http.get<CommonResponse<Event[]>>(key).then((res) => res.data)
);

export const getInitialSettings = (settingsGroup: string) : Promise<any> => {
    return new Promise<any>((resolve) => {
        resolve(http.get<CommonResponse<EditableSettings[]>>(`Settings/byGroup?settingsGroup=${settingsGroup}`)
            .then((res) => res.data))
    })
}

export const postSettings = (settings: EditableSettings) : Promise<any> => {
    return new Promise<any>((resolve) => {
        resolve(http.post<CommonResponse<EditableSettings>>(`Settings/`, settings)
            .then((res) => res.data))
    })
}

export const putSettings = (id: number, settings: EditableSettings) : Promise<any> => {
    return new Promise<any>((resolve) => {
        resolve(http.put<CommonResponse<EditableSettings>>(`Settings/${id}`, settings)
            .then((res) => res.data))
    })
}
