import {Fragment, useState, useCallback, useMemo, useEffect} from "react";

import { Box, Grid, Paper, TextField, Typography } from "@material-ui/core";

import moment from 'moment';

import { Select } from "features/misc";
import FetchedEventsList from "features/events/components/FetchedEventsList";

import { Camera } from "features/cameras";

type CameraRelatedEventsWithSelectorProps = {
  cameras: Camera[];
};

export default function CameraRelatedEventsWithSelector({
  cameras,
}: CameraRelatedEventsWithSelectorProps) {
  const [cameraId, setCameraId] = useState<Camera["id"] | null>(null);
  const [startDate, setStartDate] = useState(moment.utc().toISOString());
  const [endDate, setEndDate] = useState(moment.utc().toISOString());

  const handleChangeStartDate = useCallback(({ target: { value } }) => setStartDate(value), []);
  const handleChangeEndDate = useCallback(({ target: { value } }) => setEndDate(value), []);

  const startDateUTC = useMemo(() => moment.utc(moment(startDate)).toISOString(), [startDate]);
  const endDateUTC = useMemo(() => moment.utc(moment(endDate)).toISOString(), [endDate]);

  const [cameraName, setCameraName] = useState<string | undefined>('')

  useEffect(() => {
    setCameraName(cameras.find(camera => camera.id === cameraId)?.name ?? undefined)
  }, [cameraId])

  return (
    <Fragment>
      <Grid container spacing={3} component={Box} marginBottom={2}>
        <Grid item xs={12} md={6}>
          <Box component={Paper} paddingX={1.5} paddingY={2}>
            <Select
              options={cameras.map((camera) => ({
                label: camera.name,
                value: camera.id,
              }))}
              value={cameraName}
              onChange={({ target: { value } }) => setCameraId(value)}
              label="Детектор"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box component={Paper} paddingX={1.5} paddingY={2}>
            <TextField
              label="Начало"
              type="datetime-local"
              value={startDate}
              onChange={handleChangeStartDate}
              fullWidth
              variant="outlined"
              inputProps={{
                max: endDate,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box component={Paper} paddingX={1.5} paddingY={2}>
            <TextField
              label="Конец"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              value={endDate}
              onChange={handleChangeEndDate}
              fullWidth
              variant="outlined"
              inputProps={{
                min: startDate,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {cameraId ? (
        <FetchedEventsList
          cameraId={cameraId}
          startDate={startDateUTC}
          endDate={endDateUTC}
        />
      ) : (
        <Box marginTop={2}>
          <Typography>Выберите детектор</Typography>
        </Box>
      )}
    </Fragment>
  );
}
