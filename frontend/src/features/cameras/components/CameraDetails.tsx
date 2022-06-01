import { Typography } from "@material-ui/core";
import { Copy, DataTable, Headline } from "features/misc";
import { Camera } from "../types";
import { getCameraData } from "../utils";
import RegionListItem from "./RegionListItem";

type CameraDetailsProps = {
  camera: Camera;
};

export default function CameraDetails({ camera }: CameraDetailsProps) {
  return (
    <>
      <Typography variant="overline">
        <Copy text={camera.id} />
      </Typography>
      <Headline level="3" text="Информация" />
      <DataTable data={getCameraData(camera)} />
      <Headline level="3" text="Регионы" />
      <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
        {camera.regions.map((region) => (
          <RegionListItem region={region} key={region.id} />
        ))}
      </ul>
    </>
  );
}
