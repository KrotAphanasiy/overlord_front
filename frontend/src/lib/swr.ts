import { Fetcher, Key, KeyLoader } from "swr/dist/types";

export class InfiniteLoadRequest<T, F extends Function = KeyLoader<T>> {
  constructor(public keyLoader: F, public fetcher: Fetcher<T>) {}
}

export class StandartLoadRequest<
  T,
  F extends Key | ((...any: any[]) => Key) = Key
> {
  constructor(public key: F, public fetcher: Fetcher<T>) {}
}
