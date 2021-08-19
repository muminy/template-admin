import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

export const baseAPI = "http://api.leobambam.com/api/v1";
export const localAPI = isDev ? "http://localhost:3000/api" : "http://leobambam.com/api";

export const _userLogin = "/leo/auth/login";
export const _operations = "/leo/operations";

export const _setUserToken = "/user/token";
export const _getUserToken = "/auth/token";

export const instance = axios.create({
  baseURL: baseAPI,
  headers: {
    "Content-Type": "application/json",
  },
});
