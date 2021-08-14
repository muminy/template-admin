import useSWR from "swr";
import { postFetcher } from "./swr";

export function getContacts(args) {
  const { data, error } = useSWR(["/contact/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
