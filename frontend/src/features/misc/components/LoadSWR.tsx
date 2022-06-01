import useSWR, { Key } from "swr";
import { Fetcher, SWRConfiguration } from "swr/dist/types";
import Loading from "./Loading";

type LoadSWRProps<T, E> = {
  as: Key;
  fetcher: Fetcher<T>;
  children: (data: T) => JSX.Element;
  configuration?: SWRConfiguration<T, E>;
};

export default function LoadSWR<T, E = Error>(props: LoadSWRProps<T, E>) {
  const { as, fetcher, children, configuration } = props;
  const { data, error } = useSWR<T>(as, fetcher, configuration);

  return (
    <Loading<T> data={data} error={error}>
      {children}
    </Loading>
  );
}
