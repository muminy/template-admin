import useSWR from "swr";
import { postFetcher } from "./swr";

export function getConfigs(args) {
  const { data, error } = useSWR(["/site-settings/read", args.offset], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
