import { Camera } from "features/cameras";
import CamerasList from "features/cameras/components/CamerasList";
import { Headline, LoadSWR, NotFound } from "features/misc";
import { CommonResponse } from "types";
import { getGasStationCameras } from "../api";
import { GasStation } from "../types";

type GasStationPageCamerasProps = {
  gasStation: GasStation;
};

export default function GasStationPageCameras({
  gasStation,
}: GasStationPageCamerasProps) {
  return (
    <LoadSWR<CommonResponse<Camera[]>>
      as={getGasStationCameras.key(gasStation.id)}
      fetcher={getGasStationCameras.fetcher}
    >
      {({ data: cameras }) =>
        !cameras || cameras?.length === 0 ? (
          <NotFound text="У этой станции нет детекторов" />
        ) : (
          <>
            <Headline level="2" text="Детекторы этой станции" />
            <CamerasList cameras={cameras} />
          </>
        )
      }
    </LoadSWR>
  );
}
