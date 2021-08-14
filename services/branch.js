import useSWR from "swr";
import { postFetcher } from "./swr";

export function getBranchs(args) {
  const { data, error } = useSWR(["/branch/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
