import { Layout } from "features/layout";
import { Headline, LoadSWR } from "features/misc";
import GasStationRelatedVisits from "../components/GasStationRelatedVisits";
import { GasStation } from "features/stations";
import { CommonResponse } from "types";
import { getGasStations } from "features/stations/api";
import {Box, Button, Grid} from "@material-ui/core";
import {useModals} from "../../modal";
import VisitsEditableSettings from "../components/VisitsEditableSettings";

export default function VisitsPage() {
    const [openModal] = useModals();

    const handleSettingsClick = () => {
        openModal({
            title: "Настройки визитов",
            content: <VisitsEditableSettings />
        })
    }
    return (
    <Layout title="Визиты">
      <Box display="flex" flexDirection="row">
        <Headline level="1" text="Визиты" />
          <Grid container
                direction="row"
                justifyContent="flex-end">
              <Box paddingTop={5.5}>
                  <Button variant="text" color="primary" onClick={handleSettingsClick}>
                      Настройки
                  </Button>
              </Box>
          </Grid>
      </Box>
      <LoadSWR<CommonResponse<GasStation[]>>
        as={getGasStations.key}
        fetcher={getGasStations.fetcher}
      >
        {({ data: stations }) => (
          <GasStationRelatedVisits gasStations={stations} />
        )}
      </LoadSWR>
    </Layout>
    );
}
