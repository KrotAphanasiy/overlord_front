import { Grid } from "@material-ui/core";
import { FetchedList, ScrollTopButton } from "features/misc";
import { useModals } from "features/modal";
import { useHistory } from "react-router";
import { CommonResponse } from "types";
import { getGasStationsPaged } from "../api";
import { GasStation } from "../types";
import GasStationCard from "./GasStationCard";
import GasStationDetails from "./GasStationDetails";

export default function GasStationsFetchedList() {
  const [openModal] = useModals();
  const { push } = useHistory();

  const handleOpenTerminalsModal = (gasStation: GasStation) =>
    openModal({
      title: "Подробнее",
      content: <GasStationDetails gasStation={gasStation} />,
    });

  return (
    <Grid container spacing={3}>
      <FetchedList<CommonResponse<GasStation[]>>
        keyLoader={(index) => getGasStationsPaged.keyLoader(index, 4)}
        fetcher={getGasStationsPaged.fetcher}
        isReachingEnd={(swr) =>
          swr.data?.[0]?.data?.length === 0 || (swr.data?.[swr.data?.length - 1]?.data?.length ?? 0) < 4
        }
        renderItems={(response) =>
          response?.data?.map((gasStation) => (
            <Grid item xs={12} md={6} key={gasStation.id}>
              <GasStationCard
                gasStation={gasStation}
                onClickDetails={() => handleOpenTerminalsModal(gasStation)}
                onClickSeePage={() => push("/stations/" + gasStation.id)}
              />
            </Grid>
          ))
        }
      />
      <ScrollTopButton />
    </Grid>
  );
}
