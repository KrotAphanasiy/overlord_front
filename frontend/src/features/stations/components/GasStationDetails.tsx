import { Typography } from "@material-ui/core";
import { Copy, DataTable, Headline, LoadSWR } from "features/misc";
import { CommonResponse } from "types";
import { getGasStationsTerminals } from "../api";
import { GasStation, GasStationTerminal } from "../types";
import { getGasStationData } from "../utils";
import GasStationTerminalItem from "./GasStationTerminalItem";

type GasStationDetailsProps = {
  gasStation: GasStation;
};

export default function GasStationDetails({
  gasStation,
}: GasStationDetailsProps) {
  return (
    <>
      <Typography variant="overline">
        <Copy text={gasStation.id.toString()} />
      </Typography>
      <Headline level="3" text="Информация" />
      <DataTable data={getGasStationData(gasStation)} />
      <Headline level="3" text="Терминалы" />
      <LoadSWR<CommonResponse<GasStationTerminal[]>>
        as={getGasStationsTerminals.key(gasStation.id)}
        fetcher={getGasStationsTerminals.fetcher}
      >
        {({ data: terminals }) => (
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {terminals.map((terminal) => (
              <GasStationTerminalItem terminal={terminal} key={terminal.id} />
            ))}
          </ul>
        )}
      </LoadSWR>
    </>
  );
}
