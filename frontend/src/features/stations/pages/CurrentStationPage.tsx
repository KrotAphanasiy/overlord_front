import { useState, useEffect } from "react";

import { Redirect, useRouteMatch } from "react-router-dom";

import { Edit } from "@material-ui/icons";

import GasStationPageBody from "features/stations/components/GasStationPageBody";
import GasStationPageCameras from "features/stations/components/GasStationPageCameras";
import GasStationPageTerminals from "features/stations/components/GasStationPageTerminals";
import CurrentStationPageActions from "features/stations/components/CurrentStationPageActions";

import { CommonResponse } from "types";
import { Layout } from "features/layout";
import { Headline, LoadSWR } from "features/misc";
import { GasStation } from "features/stations/types";
import EditStationPage from "features/stations/pages/EditStationPage";
import { getGasStationById, getTerminals } from "features/stations/api";

export default function CurrentStationPage() {
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>();
  const [hasTerminals, setHasTerminals] = useState<boolean>(false);

  useEffect(() => {
    const onLoad = async () => {
      const terminals = await getTerminals(id);
      setHasTerminals(terminals.data.totalReturned !== 0);
    };

    (async () => {
      await onLoad()
    })();
  }, [id]);

  return (
    <Layout
      title={`Станция ${id}`}
      additionalRoutes={[
        {
          name: "Редактировать",
          path: `/stations/${id}/edit`,
          component: EditStationPage,
          icon: <Edit />,
        },
      ]}
    >
      <LoadSWR<CommonResponse<GasStation>>
        as={getGasStationById.key(parseInt(id))}
        fetcher={getGasStationById.fetcher}
      >
        {({ data: gasStation }) =>
          !gasStation ? (
            <Redirect to="/stations" />
          ) : (
            <>
              <Headline level="1" text={`Станция ${gasStation.name}`} />
              <CurrentStationPageActions station={gasStation} hasTerminals={hasTerminals}/>
              <GasStationPageBody gasStation={gasStation} />
              <GasStationPageTerminals gasStation={gasStation} />
              <GasStationPageCameras gasStation={gasStation} />
            </>
          )
        }
      </LoadSWR>
    </Layout>
  );
}
