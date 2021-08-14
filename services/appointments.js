import useSWR from "swr";
import { postFetcher } from "./swr";

export function getAppointments(args) {
  const { data, error } = useSWR(["/appointment/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
