import {useMemo, useState} from "react";
import {Box, Button, Grid, Paper, TextField} from "@material-ui/core";
import {deleteVisitsPictures} from "../api";
import {toast} from "react-toastify";
import moment from "moment";

type VisitsPicturesCleanupProps = {
    visitsGasStationId: number | null;
    startDate: string;
    endDate: string;
}

export default function VisitsPicturesCleanup(props: VisitsPicturesCleanupProps) {
    const [startDate, setStartDate] = useState<string>(props.startDate);
    const [endDate, setEndDate] = useState<string>(props.endDate);

    const startDateUTC = useMemo(() => moment.utc(moment(startDate)).toISOString(), [startDate]);
    const endDateUTC = useMemo(() => moment.utc(moment(endDate)).toISOString(), [endDate]);

    //TODO: add confirmation alert for pictures deletion
    const confirmAlert = () => {

    }

    const deletePictures = async () => {
        console.log(props.visitsGasStationId)
        try {
            await deleteVisitsPictures(props.visitsGasStationId, startDateUTC, endDateUTC);
            toast.info("Снимки успешно удалены")
        }catch (e) {
            toast.error("Что-то пошло не так...")
        }
    }

    return (
        <Grid item spacing={3} alignItems='center'>
            <Box paddingX={1.5} paddingY={2}>
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

            <Box paddingX={1.5} paddingY={2}>
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
            <Box paddingX={1.5} paddingY={2}>
                <Button variant="text" color="primary" onClick={deletePictures}>
                    Очистить снимки визитов
                </Button>
            </Box>
        </Grid>
    );
}