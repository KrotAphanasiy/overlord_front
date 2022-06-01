import {Grid, TextField} from "@material-ui/core";
import {ChangeEvent} from "react";

type TimeSpanPickerProps = {
    days: number
    hours: number
    minutes: number
    onDaysChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onHoursChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onMinutesChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TimeSpanPicker(props: TimeSpanPickerProps) {
    return (
        <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Дни"
                    type="number"
                    variant="outlined"
                    name="days"
                    value={props.days}
                    onChange={props.onDaysChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Часы"
                    type="number"
                    variant="outlined"
                    name="hours"
                    value={props.hours}
                    onChange={props.onHoursChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Минуты"
                    type="number"
                    variant="outlined"
                    name="hours"
                    value={props.minutes}
                    onChange={props.onMinutesChange}
                    required
                />
            </Grid>
        </Grid>
    )
}