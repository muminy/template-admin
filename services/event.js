import useSWR from "swr";
import { postFetcher } from "./swr";

export function getEvents(args) {
  const { data, error } = useSWR(["/event/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
