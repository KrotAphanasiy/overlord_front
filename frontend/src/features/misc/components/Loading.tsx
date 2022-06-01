import { CircularProgress } from "@material-ui/core";
import DisplayError from "./DisplayError";

type LoadingProps<T> = {
  children: (data: T) => JSX.Element;
  data?: T;
  error?: Error;
};

export default function Loading<T>(props: LoadingProps<T>) {
  const { data, error, children } = props;
  if (error) return <DisplayError message={error.message} />;
  if (!data) return <CircularProgress />;

  return children(data);
}
