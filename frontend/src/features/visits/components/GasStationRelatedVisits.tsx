import {useState, useMemo, useEffect} from "react";

import moment from 'moment';

import {Grid, Box, Paper, TextField, Button} from "@material-ui/core";

import FetchedVisitsList from "features/visits/components/FetchedVisitsList";
import { NotFound, Select } from "features/misc";
import { GasStation } from "features/stations";
import {Fragment} from "react";
import {useModals} from "../../modal";
import VisitsPicturesCleanup from "./VisitsPicturesCleanup";

type GasStationRelatedVisitsProps = {
  gasStations: GasStation[];
};

export default function GasStationRelatedVisits({
  gasStations,
}: GasStationRelatedVisitsProps) {
  const [gasStationId, setGasStationId] = useState<GasStation["id"] | null>(
    null
  );

  const [startDate, setStartDate] = useState(new Date('0001-01-01T00:00:00Z').toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [openModal] = useModals();

  const startDateUTC = useMemo(() => moment.utc(moment(startDate)).toISOString(), [startDate]);
  const endDateUTC = useMemo(() => moment.utc(moment(endDate)).toISOString(), [endDate]);

  const handleVisitsPicturesClean = () => {
     openModal({
         title: "Очистка снимков визитов",
         content: <VisitsPicturesCleanup visitsGasStationId={gasStationId} startDate={startDate} endDate={endDate}/>
     });
  }

  const [gasStationName, setGasStationName] = useState<string | undefined>('')
  useEffect(() => {
      setGasStationName(gasStations.find(station => station.id === gasStationId)?.name ?? undefined)
  }, [gasStationId])

  return (
    <>
      <Grid container spacing={3} component={Box} marginBottom={2}>
        <Grid item xs={12} sm={6}>
          <Box component={Paper} paddingX={1.5} paddingY={2}>
            <Select
              options={gasStations.map((gasStation) => ({
                label: gasStation.name,
                value: gasStation.id,
              }))}
              value={gasStationName}
              onChange={({ target: { value } }) =>
                setGasStationId(parseInt(value))
              }
              label="Станция"
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
          <Grid item xs={12} sm={6} md={3}>
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


      {gasStationId ? (
        <Fragment>
          <FetchedVisitsList
              gasStationId={gasStationId}
              startDate={startDateUTC}
              endDate={endDateUTC}
          />
          <Grid container
              direction="row"
              justifyContent="flex-end">
          <Box paddingY={2}>
              <Button variant="text" color="primary" onClick={handleVisitsPicturesClean}>
                  Очистить снимки визитов
              </Button>
          </Box>
          </Grid>
      </Fragment>
      ) : (
        <NotFound text="Выберите станцию" />
      )}
    </>
  );
}
