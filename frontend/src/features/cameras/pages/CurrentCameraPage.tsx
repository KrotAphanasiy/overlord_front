import { Paper, Typography, Box } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import CurrentCameraPageEvents from "../components/CurrentCameraPageEvents";
import { Layout } from "features/layout";
import { Copy, DataTable, Headline, LoadSWR } from "features/misc";
import { Redirect, useRouteMatch } from "react-router-dom";
import { CommonResponse } from "types";
import { getCameraById } from "../api";
import { Camera } from "../types";
import { getCameraData, getRegionData } from "../utils";
import EditCameraPage from "./EditCameraPage";
import CurrentCameraPageActions from "../components/CurrentCameraPageActions";

export default function CurrentCameraPage() {
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>();

  return (
    <Layout
      title={`Детектор ${id}`}
      additionalRoutes={[
        {
          name: "Редактировать",
          path: `/cameras/${id}/edit`,
          component: EditCameraPage,
          icon: <Edit />,
        },
      ]}
    >
      <LoadSWR<CommonResponse<Camera>>
        as={getCameraById.key(id)}
        fetcher={getCameraById.fetcher}
      >
        {({ data: camera }) =>
          !camera ? (
            <Redirect to="/cameras" />
          ) : (
            <>
              <Headline level="1" text={`Детектор ${camera.name}`} />
              <CurrentCameraPageActions camera={camera} />
              <Paper>
                <Box paddingY={1} paddingX={1.5}>
                  <Typography variant="overline">
                    <Copy text={camera.id} />
                  </Typography>
                </Box>
                <DataTable data={getCameraData(camera)} />
              </Paper>
              {camera.regions.length > 0 && (
                <>
                  <Headline level="2" text="Регионы" />
                  <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
                    {camera.regions.map((region) => (
                      <Box
                        component={Paper}
                        paddingTop={1}
                        key={region.id}
                        marginBottom={1.5}
                      >
                        <DataTable data={getRegionData(region)} />
                      </Box>
                    ))}
                  </ul>
                </>
              )}
              <Headline level="2" text="Снимки этого детектора" />
              <CurrentCameraPageEvents cameraId={camera.id} />
            </>
          )
        }
      </LoadSWR>
    </Layout>
  );
}
