import { Grid, Box, Paper, TextField } from "@material-ui/core";
import { FetchedEventsList } from "features/events";
import { useState } from "react";
import { Camera } from "..";

type CurrentCameraPageEventsProps = {
  cameraId: Camera["id"];
};

export default function CurrentCameraPageEvents({
  cameraId,
}: CurrentCameraPageEventsProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <Grid container spacing={3} component={Box} marginBottom={2}>
        <Grid item xs={12} sm={6}>
          <Box component={Paper} paddingX={1.5} paddingY={2}>
            <TextField
              label="Начало"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
        <Grid item xs={12} sm={6}>
          <Box component={Paper} paddingX={1.5} paddingY={2}>
            <TextField
              label="Конец"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
      <FetchedEventsList
        cameraId={cameraId}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}
