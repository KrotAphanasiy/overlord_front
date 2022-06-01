import { Add } from "@material-ui/icons";
import { Layout } from "features/layout";
import { Headline } from "features/misc";
import { CreateStationPage } from "..";
import GasStationsFetchedList from "../components/GasStationsFetchedList";

export default function StationsPage() {
  return (
    <Layout
      title="Станции"
      additionalRoutes={[
        {
          name: "Добавить станцию",
          path: "/stations/create",
          icon: <Add />,
          component: CreateStationPage,
        },
      ]}
    >
      <Headline level="1" text="Станции" />
      <GasStationsFetchedList />
    </Layout>
  );
}
