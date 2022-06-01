import { Box, Typography } from "@material-ui/core";
import { DataTable } from "features/misc";
import { GasStationTerminal } from "../types";
import { getTerminalData } from "../utils";

type GasStationTerminalItemProps = {
  terminal: GasStationTerminal;
};

export default function GasStationTerminalItem({
  terminal,
}: GasStationTerminalItemProps) {
  return (
    <Box component="li" paddingBottom={1.5}>
      <Typography variant="subtitle2" gutterBottom>
        Терминал {terminal.id}
      </Typography>
      <DataTable data={getTerminalData(terminal)} />
    </Box>
  );
}
