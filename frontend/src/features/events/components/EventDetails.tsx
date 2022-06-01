import { Box, Typography, Link as MaterialLink } from "@material-ui/core";
import { DataTable, Copy } from "features/misc";
import { useModals } from "features/modal";
import { Link } from "features/router";
import { imageSource } from "utils";
import { Event } from "../types";
import { getEventData } from "../utils";

type EventDetailsProps = {
  event: Event;
};

export default function EventDetails({ event }: any) {
  const [, closeModal] = useModals();

  return (
    <>
      <Typography variant="overline">
        <Copy text={event.id} />
      </Typography>
      <DataTable data={getEventData(event)} />
      <Box paddingTop={1.5}>
        <MaterialLink href={imageSource(event.imageLink)} target="_blank">
          Открыть исходную картику
        </MaterialLink>
      </Box>
      <Box paddingTop={1.5}>
        <Link asLink onClick={closeModal} to={`/cameras/${event.cameraId}`}>
          Открыть страницу детектора
        </Link>
      </Box>
    </>
  );
}
