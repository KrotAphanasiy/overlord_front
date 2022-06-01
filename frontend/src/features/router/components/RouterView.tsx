import { Route as BrowserRoute, Switch } from "react-router-dom";
import { Route } from "../types";

type RouterProps = {
  routes: Route[];
};

export default function RouterView({ routes }: RouterProps) {
  return (
    <Switch>
      {routes.map((route) => (
        <BrowserRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact
        />
      ))}
    </Switch>
  );
}
