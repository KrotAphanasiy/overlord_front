import { Paper, Box, Typography } from "@material-ui/core";
import { Copy, DataTable } from "features/misc";
import { GasStation } from "../types";
import { getGasStationData } from "../utils";

type GasStationPageBodyProps = {
  gasStation: GasStation;
};

export default function GasStationPageBody({
  gasStation,
}: GasStationPageBodyProps) {
  return (
    <Paper>
      <Box paddingY={1} paddingX={1.5}>
        <Typography variant="overline">
          <Copy text={gasStation.id.toString()} />
        </Typography>
      </Box>
      <DataTable data={getGasStationData(gasStation)} />
    </Paper>
  );
}
