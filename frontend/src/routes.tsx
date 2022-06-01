import {
  CameraAlt, CropOriginalOutlined,
  DriveEta,
  Event,
  LocalGasStation,
} from "@material-ui/icons";
import { LoginPage } from "features/auth";
import {
  CamerasPage,
  CurrentCameraPage,
  EditCameraPage,
} from "features/cameras";
import CreateCameraPage from "features/cameras/pages/CreateCameraPage";
import { EventsPage } from "features/events";
import { MenuRoute } from "features/layout";
import { Route, createRedirect } from "features/router";
import {
  CreateStationPage,
  CurrentStationPage,
  EditStationPage,
  StationsPage,
} from "features/stations";
import { VisitsPage } from "features/visits";

export const menuRoutes: MenuRoute[] = [
  {
    name: "Детекторы",
    path: "/cameras",
    component: CamerasPage,
    icon: <CameraAlt />,
  },
  {
    name: "Визиты",
    path: "/visits",
    component: VisitsPage,
    icon: <DriveEta />,
  },
  {
    name: "Снимки",
    path: "/events",
    component: EventsPage,
    icon: <CropOriginalOutlined />,
  },
  {
    name: "Станции",
    path: "/stations",
    component: StationsPage,
    icon: <LocalGasStation />,
  },
];

const extraRoutes: Route[] = [
  {
    path: "/",
    component: createRedirect("/cameras"),
  },
  {
    path: "/auth/login",
    component: LoginPage,
  },
  {
    path: "/cameras/create",
    component: CreateCameraPage,
  },
  {
    path: "/cameras/:id",
    component: CurrentCameraPage,
  },
  {
    path: "/cameras/:id/edit",
    component: EditCameraPage,
  },
  {
    path: "/stations/create",
    component: CreateStationPage,
  },
  {
    path: "/stations/:id",
    component: CurrentStationPage,
  },
  {
    path: "/stations/:id/edit",
    component: EditStationPage,
  },
];

export const allRoutes: Route[] = extraRoutes.concat(menuRoutes);
