import {ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";

import { toast } from "react-toastify";

import { Box, Paper, Grid, TextField, Button } from "@material-ui/core";

import { Select } from "features/misc";
import { GasStation } from "features/stations";
import { CameraEdit } from "features/cameras/types";

type CameraDataFormProps = {
  cameraData: Partial<CameraEdit>;
  setCameraState: Dispatch<SetStateAction<Partial<CameraEdit>>>
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onResetCameraData: () => void;
  onChangeStation: (stationid: number) => void;
  stations: GasStation[];
};


export default function CameraDataForm(props: CameraDataFormProps) {
  const { cameraData, onChange, onResetCameraData, onChangeStation, stations, setCameraState } = props;

  const [gasStationName, setGasStationName] = useState<string | undefined>('')

  useEffect(() => {
    setGasStationName(stations.find(station => station.id === cameraData.gasStationId)?.name ?? undefined)
  }, [cameraData])

  return (
    <Box component={Paper} paddingX={1.5} paddingY={2} width="100%">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Имя"
            fullWidth
            variant="outlined"
            name="name"
            value={cameraData.name}
            onChange={onChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="API-ключ"
            fullWidth
            variant="outlined"
            name="apiKey"
            value={cameraData.apiKey}
            onChange={onChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            options={stations.map((gasStation) => ({
              label: gasStation.name,
              value: gasStation.id,
            }))}
            value={gasStationName}
            onChange={({ target: { value } }) =>
              onChangeStation(parseInt(value))
            }
            label="Станция"
            fullWidth
            variant="outlined"
            name="gasStationId"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
              label="URL подключения к камере"
              fullWidth
              variant="outlined"
              name="connectionUrl"
              value={cameraData.connectionUrl}
              onChange={onChange}
              required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Заметки"
            multiline
            fullWidth
            variant="outlined"
            name="notes"
            value={cameraData.notes}
            minRows={2}
            onChange={onChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            height="100%"
          >
            <Button color="primary" onClick={onResetCameraData}>
              Восстановить
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
