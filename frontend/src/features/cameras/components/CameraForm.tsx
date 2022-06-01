import { FC, ChangeEvent, FormEventHandler, useState, useMemo, useEffect } from "react";

import { isEqual } from 'lodash';

import { Box, Divider, Typography, Button } from "@material-ui/core";

import { LoadSWR, LoadingButton } from "features/misc";
import { useModals } from "features/modal";
import {
  GasStation,
  GasStationTerminal,
  getGasStations,
  getGasStationsTerminalsAvailable,
} from "features/stations";
import { Camera, CameraEdit } from "features/cameras";

import { toInt } from "utils";

import CameraDataForm from "features/cameras/components/CameraDataForm";
import CameraRegionsForm from "features/cameras/components/CameraRegionsForm";

import { CommonResponse } from "types";
import { Region } from "features/cameras/types";

interface CameraFormProps {
  initialCameraData: Partial<CameraEdit>;
  onSubmit: (camera: Camera) => void;
  isLoading?: boolean;
}

const CameraForm: FC<CameraFormProps> = ({ initialCameraData, onSubmit, isLoading }) => {
  const [cameraState, setCameraState] = useState(initialCameraData);
  const [openModal] = useModals();

  const handleChangeCameraData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setCameraState((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === "number" ? toInt(e.target.value) : e.target.value,
    }));

  const handleChangeRegionsData = (e: ChangeEvent<HTMLInputElement>) => {
    const info = e.target.name.split(".");
    const regionId = parseInt(info[0]);
    const fieldName = info[1];

    setCameraState((prevState) => ({
      ...prevState,
      regions: prevState?.regions?.map((region) =>
        region.id === regionId
          ? { ...region, [fieldName]: e.target.value }
          : region
      ),
    }));
  };

  const handleDeleteRegion = (regionId: number) =>
    openModal({
      title: "Удалить регион?",
      actions: {
        Удалить: () =>
          setCameraState((prevState) => ({
            ...prevState,
            regions: prevState?.regions?.filter(
              (region) => region.id !== regionId
            ),
          })),
      },
    });

  const handleChangeCameraStation = (stationId: number) =>
    setCameraState((prevState) => ({
      ...prevState,
      gasStationId: stationId,
    }));

  const handleResetRegion = (regionId: number) =>
    openModal({
      title: "Восстановить значения?",
      actions: {
        Восстановить: () => {
          setCameraState((prevState) => ({
            ...prevState,
            regions: prevState.regions?.map((region) => {
              const isSeekedRegion = region.id === regionId;
              
              if (!isSeekedRegion) return region;

              if ('isNew' in region) {
                return {
                  id: region.id,
                  regionName: '',
                  cameraId: initialCameraData.id,
                  topLeftX: 0,
                  topLeftY: 0,
                  bottomRightX: 0,
                  bottomRightY: 0,
                };
              }
              return initialCameraData.regions?.find(({id}) => id && id === regionId) as Region;
            }),
          }))
        },
      },
    });

  const handleResetCameraData = () =>
    openModal({
      title: "Восстановить значения?",
      actions: {
        Восстановить: () =>
          setCameraState((prevState) => ({
            ...initialCameraData,
            regions: prevState.regions,
          })),
      },
    });

  const handleResetAll = () =>
    openModal({
      title: "Восстановить все значения?",
      actions: {
        Востановить: () => setCameraState(initialCameraData),
      },
    });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    openModal({
      title: "Завершить редактирование?",
      content: "Данные будут сохранены на сервере",
      actions: {
        Сохранить: () => onSubmit(cameraState as Camera),
      },
    });
  };

  const handleAddRegion = () => {
    setCameraState(
      (prevState) =>
        ({
          ...prevState,
          regions: [
            ...(prevState?.regions ?? []),
            {
              isNew: true,
              id:
                (prevState?.regions?.reduce(
                  (acc, curr) => Math.max(acc, curr.id),
                  0
                ) ?? 0) + 1,
              regionName: "",
              cameraId: prevState.id,
              topLeftX: 0,
              topLeftY: 0,
              bottomRightX: 0,
              bottomRightY: 0,
              terminalId: "",
            },
          ],
        } as Camera)
    );
  };
  
  const hasChanges = useMemo(() => isEqual(initialCameraData, cameraState), [cameraState, initialCameraData]);

  useEffect(() => {
    setCameraState(initialCameraData);
  }, [initialCameraData]);

  return (
    <form onSubmit={handleSubmit}>
      <LoadSWR<CommonResponse<GasStation[]>>
        as={getGasStations.key}
        fetcher={getGasStations.fetcher}
      >
        {({ data: stations }) => (
          <CameraDataForm
            stations={stations}
            cameraData={cameraState}
            setCameraState={setCameraState}
            onChange={handleChangeCameraData}
            onResetCameraData={handleResetCameraData}
            onChangeStation={handleChangeCameraStation}
          />
        )}
      </LoadSWR>
      {cameraState.gasStationId && (
        <LoadSWR <CommonResponse<GasStationTerminal[]>>
          as={getGasStationsTerminalsAvailable.key(cameraState.gasStationId)}
          fetcher={getGasStationsTerminalsAvailable.fetcher}
        >
          {({ data: availableTerminals }) => (
            <CameraRegionsForm
              onChange={handleChangeRegionsData}
              onDeleteRegion={handleDeleteRegion}
              onResetRegion={handleResetRegion}
              onAddRegion={handleAddRegion}
              camera={cameraState}
              initialCamera={initialCameraData}
              availableTerminalIds={availableTerminals.map((terminal) => terminal.id)}
            />
          )}
        </LoadSWR>
      )}
      <Divider />
      <Box
        paddingX={1.5}
        paddingY={2}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1">Завершить редактирование</Typography>
        <div>
          <Button
            color="primary"
            onClick={handleResetAll}
            style={{ marginRight: 8 }}
            disabled={hasChanges || isLoading}
          >
            Восстановить
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={hasChanges}
            loading={isLoading}
          >
            Сохранить
          </LoadingButton>
        </div>
      </Box>
    </form>
  );
}

export default CameraForm;
