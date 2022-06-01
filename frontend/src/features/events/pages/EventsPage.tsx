import { useCameras } from "features/cameras";
import { Camera } from "features/cameras/types";
import { Layout } from "features/layout";
import { Headline, Loading } from "features/misc";
import CameraRelatedEventsWithSelector from "../components/CameraRelatedEventsWithSelector";
import {Box, Button, Grid} from "@material-ui/core";
import {useModals} from "../../modal";
import EventsEditableSettings from "../components/EventsEditableSettings";

export default function EventsPage() {
  const { data: cameras, error: camerasError } = useCameras();
  const [openModal] = useModals();

  const handleSettingsClick = () => {
      openModal({
          title: "Настройки снимков",
          content: <EventsEditableSettings />
      })
  }

  return (
      <Layout title="Снимки">
        <Box display="flex" flexDirection="row">
          <Headline level="1" text="Снимки" />
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
        <Loading<Camera[]> data={cameras} error={camerasError}>
          {(cameras) => <CameraRelatedEventsWithSelector cameras={cameras}/>}
        </Loading>
      </Layout>
  );
}
