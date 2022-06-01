import { Box, Paper } from "@material-ui/core";
import { DataTable, Headline, LoadSWR, NotFound } from "features/misc";
import { CommonResponse } from "types";
import { GasStation, GasStationTerminal } from "..";
import { getGasStationsTerminals } from "../api";
import { getTerminalData } from "../utils";

type GasStationPageTerminalsProps = {
  gasStation: GasStation;
};

export default function GasStationPageTerminals({
  gasStation,
}: GasStationPageTerminalsProps) {
  return (
    <LoadSWR<CommonResponse<GasStationTerminal[]>>
      as={getGasStationsTerminals.key(gasStation.id)}
      fetcher={getGasStationsTerminals.fetcher}
    >
      {({ data: terminals }) =>
        !terminals || terminals?.length === 0 ? (
          <NotFound text="У этой станции нет терминалов" />
        ) : (
          <>
            <Headline level="2" text="Терминалы этой станции" />
            <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
              {terminals.map((terminal) => (
                <Box
                  component={Paper}
                  paddingTop={1}
                  key={terminal.id}
                  marginBottom={1.5}
                >
                  <DataTable data={getTerminalData(terminal)} />
                </Box>
              ))}
            </ul>
          </>
        )
      }
    </LoadSWR>
  );
}
