import axios from "axios";
import { instance, localAPI, _userLogin, _setUserToken, _getUserToken } from "./urls";

export async function handleUserLogin(payload) {
  const handleUser = await instance.post(_userLogin, payload);
  return handleUser.data;
}

export async function handleSetToken(userToken) {
  const setUserToken = await axios.post(`${localAPI}${_setUserToken}`, { token: userToken });
  return setUserToken.data;
}

export async function handleGetToken(userToken) {
  const setUserToken = await axios.post(`${localAPI}${_getUserToken}`);
  return setUserToken.data;
}
