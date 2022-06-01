import {Box, Button, Grid} from "@material-ui/core";
import {Headline} from "../../misc";
import TimeSpanPicker from "./TimeSpanPicker";
import {ChangeEvent, useEffect, useState} from "react";
import {getInitialSettings, postSettings, putSettings} from "../api";
import {EditableSettings} from "../types";
import {TimeSpan} from "../../../lib/timespan";
import {toast} from "react-toastify";

type EventsEditableSettingsProps = {

}

export default function EventsEditableSettings(props: EventsEditableSettingsProps) {

    const [croppedDays, setCroppedDays] = useState<number>(0)
    const [croppedHours, setCroppedHours] = useState<number>(0)
    const [croppedMinutes, setCroppedMinutes] = useState<number>(0)

    const [fullDays, setFullDays] = useState<number>(0)
    const [fullHours, setFullHours] = useState<number>(0)
    const [fullMinutes, setFullMinutes] = useState<number>(0)

    const [lastSettings, setLastSettings] = useState<EditableSettings[]>()

    const handleCroppedDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
        const daysToSet = parseInt(e.target.value);
        if (daysToSet < 0) setCroppedDays(0)
        else setCroppedDays(daysToSet)
    }

    const handleCroppedHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
        const hoursToSet = parseInt(e.target.value);

        if (hoursToSet < 0) setCroppedHours(0)
        else if (hoursToSet > 23) setCroppedHours(23)
        else setCroppedHours(hoursToSet)
    }

    const handleCroppedMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const minutesToSet = parseInt(e.target.value);
        if (minutesToSet < 0) setCroppedMinutes(0)
        else if (minutesToSet > 59) setCroppedMinutes(59)
        else setCroppedMinutes(minutesToSet)
    }

    const handleFullDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
        const daysToSet = parseInt(e.target.value);
        if (daysToSet < 0) setFullDays(0)
        else setFullDays(daysToSet)
    }

    const handleFullHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
        const hoursToSet = parseInt(e.target.value);

        if (hoursToSet < 0) setFullHours(0)
        else if (hoursToSet > 23) setFullHours(23)
        else setFullHours(hoursToSet)
    }

    const handleFullMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const minutesToSet = parseInt(e.target.value);
        if (minutesToSet < 0) setFullMinutes(0)
        else if (minutesToSet > 59) setFullMinutes(59)
        else setFullMinutes(minutesToSet)
    }

    const loadInitialSettings = async () => {
        const response = await getInitialSettings("PicturesLifetime")
        const settings = response.data
        setLastSettings(settings)

        console.log(lastSettings)

        response.data.forEach((element : EditableSettings) => {
                const timespan = TimeSpan.fromMinutes(Number(element.value))

                if (element.key === "FullPicturesLifetime") {
                    setFullDays(timespan.days)
                    setFullHours(timespan.hours)
                    setFullMinutes(timespan.minutes)
                } else if (element.key === "CroppedPicturesLifetime"){
                    setCroppedDays(timespan.days)
                    setCroppedHours(timespan.hours)
                    setCroppedMinutes(timespan.minutes)
                }
            }
        )
    }

    const handleSaveButtonClick = async () => {
        try {
            if (lastSettings === undefined || lastSettings.length === 0) {
                await postSettings({
                    settingsGroup: "PicturesLifetime",
                    key: "CroppedPicturesLifetime",
                    value: `${croppedMinutes + croppedHours * 60 + croppedDays * 24 * 60}`
                } as EditableSettings)
                await postSettings({
                    settingsGroup: "PicturesLifetime",
                    key: "FullPicturesLifetime",
                    value: `${fullMinutes + fullHours * 60 + fullDays * 24 * 60}`
                } as EditableSettings)
            } else {
                let sentCropped = false;
                let sentFull = false

                for (const element of lastSettings) {
                    if (element.key === "CroppedPicturesLifetime") {
                        await putSettings(element.id, {
                            settingsGroup: "PicturesLifetime",
                            key: "CroppedPicturesLifetime",
                            value: `${croppedMinutes + croppedHours * 60 + croppedDays * 24 * 60}`
                        } as EditableSettings);
                        sentCropped = true
                    }else if (element.key === "FullPicturesLifetime"){
                        await putSettings(element.id, {
                            settingsGroup: "PicturesLifetime",
                            key: "FullPicturesLifetime",
                            value: `${fullMinutes + fullHours * 60 + fullDays * 24 * 60}`
                        } as EditableSettings);
                        sentFull = true
                    }
                }

                if (!sentCropped) {
                    await postSettings({
                        settingsGroup: "PicturesLifetime",
                        key: "CroppedPicturesLifetime",
                        value: `${croppedMinutes + croppedHours * 60 + croppedDays * 24 * 60}`
                    } as EditableSettings)
                }
                if (!sentFull) {
                    await postSettings({
                        settingsGroup: "PicturesLifetime",
                        key: "FullPicturesLifetime",
                        value: `${fullMinutes + fullHours * 60 + fullDays * 24 * 60}`
                    } as EditableSettings)
                }

            }
            toast.info("Настройки сохранены")
        }catch (e) {
            toast.error("Что-то пошло не так...")
        }

    }

    useEffect(() => {
        (async () => {
            await loadInitialSettings()
        })();
    }, [])


    return (
        <>
            <Grid container direction="column" justifyContent="center">
                <Headline level="3" text="Время жизни полных снимков" />
                <TimeSpanPicker days={fullDays} hours={fullHours} minutes={fullMinutes}
                                onDaysChange={handleFullDaysChange}
                                onHoursChange={handleFullHoursChange}
                                onMinutesChange={handleFullMinutesChange}
                />
                <Headline level="3" text="Время жизни снимков номеров" />
                <TimeSpanPicker days={croppedDays} hours={croppedHours} minutes={croppedMinutes}
                                onDaysChange={handleCroppedDaysChange}
                                onHoursChange={handleCroppedHoursChange}
                                onMinutesChange={handleCroppedMinutesChange}
                />

                <Box paddingTop={2.5}>
                    <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>
                        Сохранить
                    </Button>
                </Box>
            </Grid>
        </>
    )
}