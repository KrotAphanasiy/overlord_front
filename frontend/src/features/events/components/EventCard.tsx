import { Card, Box, Typography, CardMedia, Button } from "@material-ui/core";
import { Copy, DataTable } from "features/misc";
import { imageSource } from "utils";
import { Event } from "../types";
import { getShortEventData } from "../utils";

type EventCardProps = {
  event: Event;
  onClickDetails: () => void;
};

export default function EventCard(props: EventCardProps) {
  const { event, onClickDetails } = props;

  return (
    <Card component="article">
      <CardMedia
        style={{
          height: 32,
          backgroundSize: "contain",
          backgroundPosition: "right",
        }}
        image={imageSource(event.processedImageLink)}
      />
      <Box paddingY={2} paddingX={1.5}>
        <Typography variant="overline">
          <Copy text={event.id} />
        </Typography>
      </Box>
      <DataTable data={getShortEventData(event)} />
      <Box display="flex" justifyContent="flex-end" padding={1.5}>
        <Button onClick={onClickDetails}>Подробнее</Button>
      </Box>
    </Card>
  );
}
