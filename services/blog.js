import useSWR from "swr";
import { postFetcher } from "./swr";

export function getBlogs(args) {
  const { data, error } = useSWR(["/blog/read", args.offset, args.search], (url) =>
    postFetcher(url, args)
  );
  return { data, error };
}
