import { SET_USER_TOKEN } from "store/types";

export function setToken(token) {
  return { type: SET_USER_TOKEN, payload: token };
}
