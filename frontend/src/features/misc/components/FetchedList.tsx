import { Box, CircularProgress, Typography } from "@material-ui/core";
import InfiniteScroll from "react-swr-infinite-scroll";
import { KeyLoader, useSWRInfinite } from "swr";
import { Fetcher } from "swr/dist/types";

type FetchedListProps<T> = {
  keyLoader: KeyLoader<T>;
  fetcher: Fetcher<T>;
  renderItems: (data: T) => JSX.Element[];
  isReachingEnd: (swr: any) => boolean;
};

export default function FetchedList<T>(props: FetchedListProps<T>) {
  const { keyLoader, fetcher, renderItems, isReachingEnd } = props;
  const swr = useSWRInfinite<T>(keyLoader, fetcher, { revalidateAll: true });
  return (
    <InfiniteScroll
      swr={swr}
      loadingIndicator={
        <Box display="flex" justifyContent="center" padding={2}>
          <CircularProgress />
        </Box>
      }
      endingIndicator={
        <Box display="flex" justifyContent="center" padding={2}>
          <Typography variant="subtitle2">Все данные загружены</Typography>
        </Box>
      }
      isReachingEnd={isReachingEnd}
    >
      {renderItems}
    </InfiniteScroll>
  );
}
