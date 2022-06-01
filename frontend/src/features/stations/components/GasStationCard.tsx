import { Card, Box, Typography, Button } from "@material-ui/core";
import { Copy, DataTable, Headline } from "features/misc";
import { GasStation } from "../types";
import { getGasStationData } from "../utils";

type GasStationCardProps = {
  gasStation: GasStation;
  onClickDetails: () => void;
  onClickSeePage: () => void;
};

export default function GasStationCard(props: GasStationCardProps) {
  const { gasStation, onClickDetails, onClickSeePage } = props;

  return (
    <Card component="article">
      <Box paddingTop={2} paddingX={1.5}>
        <Typography variant="overline">
          <Copy text={gasStation.id.toString()} />
        </Typography>
        <Headline level="2" text={gasStation.name} />
      </Box>
      <DataTable data={getGasStationData(gasStation)} />
      <Box display="flex" justifyContent="flex-end" padding={1.5}>
        <Button onClick={onClickDetails}>Подробнее</Button>
        <Button color="primary" onClick={onClickSeePage}>
          Страница станции
        </Button>
      </Box>
    </Card>
  );
}
