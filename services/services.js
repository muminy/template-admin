import useSWR from "swr";
import { postFetcher } from "./swr";

export function getServices(args) {
  const { data, error } = useSWR(["/services/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}

export function getServiceGroups(args) {
  const { data, error } = useSWR(["/service-groups/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
