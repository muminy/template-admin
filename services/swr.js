import axios from "axios";
import qs from "qs";

export const baseURL = "http://localhost:3001";

export const ApiFetcher = axios.create({
  baseURL,
});

export const postFetcher = (url, args, method = "QS") => {
  let argument_lists;

  if (method === "FORM_DATA") {
    const list = new FormData();

    Object.keys(args).map((item) => {
      list.append(item, args[item]);
    });

    argument_lists = list;
  } else {
    argument_lists = qs.stringify({ ...args });
  }

  return ApiFetcher({ url, data: argument_lists, method: "POST" }).then((res) => res.data);
};
export const getFetcher = (url) => ApiFetcher.get(url).then((res) => res.data);
