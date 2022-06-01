import { Box, Button, Card, Typography } from "@material-ui/core";
import { Copy, Headline } from "features/misc";
import DataTable from "features/misc/components/DataTable";
import { Camera } from "../types";
import { getShortCameraData } from "../utils";

type CameraCardProps = {
  camera: Camera;
  onClickSeePage: () => void;
  onClickDetails: () => void;
};

export default function CameraCard(props: CameraCardProps) {
  const { camera, onClickSeePage, onClickDetails } = props;

  return (
    <Card component="article">
      <Box paddingTop={2} paddingX={1.5}>
        <Typography variant="overline">
          <Copy text={camera.id} />
        </Typography>
        <Headline level="2" text={camera.name} />
      </Box>
      <DataTable data={getShortCameraData(camera)} />
      <Box display="flex" justifyContent="flex-end" padding={1.5}>
        <Button onClick={onClickDetails}>Подробнее</Button>
        <Button color="primary" onClick={onClickSeePage}>
          Страница детектора
        </Button>
      </Box>
    </Card>
  );
}
