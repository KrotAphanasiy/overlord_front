import { Route } from "features/router";

export type MenuRoute = Route & {
  name: string;
  icon: JSX.Element;
};
