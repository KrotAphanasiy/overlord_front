import { Redirect } from "react-router-dom";

export function createRedirect(to: string) {
  return () => <Redirect to={to} />;
}
