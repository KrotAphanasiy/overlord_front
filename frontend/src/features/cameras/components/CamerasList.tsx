import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CameraCard from "./CameraCard";
import { Camera } from "../types";
import { useModals } from "features/modal";
import CameraDetails from "./CameraDetails";

type CamerasListProps = {
  cameras: Camera[];
};

export default function CamerasList(props: CamerasListProps) {
  const { cameras } = props;
  const { push } = useHistory();
  const [openMoadal] = useModals();

  const handleOpenRegionsModal = (camera: Camera) =>
    openMoadal({
      title: "Подробнее",
      content: <CameraDetails camera={camera} />,
    });

  return (
    <Grid container spacing={3}>
      {cameras.map((camera) => (
        <Grid item xs={12} md={6} key={camera.id}>
          <CameraCard
            camera={camera}
            onClickSeePage={() => push(`/cameras/${camera.id}`)}
            onClickDetails={() => handleOpenRegionsModal(camera)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
