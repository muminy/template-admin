import useSWR from "swr";
import { postFetcher } from "./swr";

export function getStaffs(args) {
  const { data, error } = useSWR(["/staffs/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
