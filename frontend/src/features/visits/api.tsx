import http from "lib/http";
import { GasStation } from "features/stations";
import { InfiniteLoadRequest } from "lib/swr";
import { CommonResponse } from "types";
import {EditableSettings, Visit} from "./types";

export const getVisits = new InfiniteLoadRequest<
  CommonResponse<Visit[]>,
  (index: number,
   gasStationsId: GasStation["id"],
   startDate: string,
   endDate: string
  ) => string
>(
  (index, gasStationsId, startDate, endDate) =>
    `Visits/station/${gasStationsId}?pageSize=4&pageNumber=${index + 1}&startDate=${startDate}&endDate=${endDate}`,
  (key: string) =>
    http.get<CommonResponse<Visit[]>>(key).then((res) => res.data)
);

export const deleteVisitsPictures = (gasStationId: number | null, startDate: string, endDate: string): Promise<any> => {
    return new Promise<any>((resolve) => {
        resolve(http.post<CommonResponse<boolean>>(`Visits/clean_pictures/station/${gasStationId}?startDate=${startDate}&endDate=${endDate}`)
            .then((res) => res.data))
    });
}

export const getInitialSettings = (settingsGroup: string) : Promise<any> => {
    return new Promise<any>((resolve) => {
        resolve(http.get<CommonResponse<EditableSettings[]>>(`Settings/byGroup?settingsGroup=${settingsGroup}`)
            .then((res) => res.data))
    })
}

export const putSettings = (id: number, settings: EditableSettings) : Promise<any> => {
    return new Promise<any>((resolve) => {
        resolve(http.put<CommonResponse<EditableSettings>>(`Settings/${id}`, settings)
            .then((res) => res.data))
    })
}
