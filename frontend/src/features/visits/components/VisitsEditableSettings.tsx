import {Box, Button, Grid, TextField} from "@material-ui/core";
import {Headline} from "../../misc";
import {ChangeEvent, useEffect, useState} from "react";
import {EditableSettings} from "../types";
import {getInitialSettings, putSettings} from "../api";
import {postSettings} from "../../events/api";
import {toast} from "react-toastify";

type VisitsEditableSettingsProps = {

}

export default function VisitsEditableSettings(props: VisitsEditableSettingsProps) {
    const [mask, setMask] = useState<string>("")
    const [lastSettings, setLastSettings] = useState<EditableSettings[]>()

    const handleMaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMask(e.target.value)
    }

    const handleSaveButtonClick = async () => {
        try {
            if (lastSettings === undefined || lastSettings.length === 0) {
                RegExp(mask)
                await postSettings({
                    settingsGroup: "Visits",
                    key: "mask",
                    value: mask
                } as EditableSettings)
            } else {
                for (const element of lastSettings) {
                    RegExp(mask)
                    await putSettings(element.id, {settingsGroup: "Visits",
                        key: "mask",
                        value: mask
                        } as EditableSettings)
                }
            }
            toast.info("Настройки успешно сохранены")
        }catch(e){
            toast.error("Что-то пошло не так...")
        }
    }

    const loadInitialSettings = async () => {
        const response = await getInitialSettings("Visits")
        const settings = response.data
        setLastSettings(settings as EditableSettings[])

        console.log(response.data)

        response.data.forEach((element: EditableSettings) => {
            if (element.key === "mask") {
                setMask(element.value)
            }
        })
    }

    useEffect(() => {
        (async () => {
            await loadInitialSettings()
        })();
    }, [])

    return (
        <>
            <Grid container direction="column" justifyContent="center">
                <Headline level="3" text="Валидация номеров" />
                <TextField
                    label="Маска"
                    type="string"
                    variant="outlined"
                    name="mask"
                    value={mask}
                    onChange={handleMaskChange}
                />

                Внимание! Ввод некорректной маски может повлечь за собой неправильный расчет визитов!

                <Box paddingTop={2.5}>
                    <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>
                        Сохранить
                    </Button>
                </Box>
            </Grid>
        </>
    )
}