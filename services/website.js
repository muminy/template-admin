import axios from "axios";
import { localAPI, _addWebsite, _deleteWebsite, _getWebsites } from "./urls";

export async function handleAddWebsite(website) {
  const add = await axios.post(`${localAPI}${_addWebsite}`, { website });
  return add.data;
}

export async function handleRemoveWebsite(index) {
  const add = await axios.post(`${localAPI}${_deleteWebsite}`, { index });
  return add.data;
}

export async function handleGetWebsite(index) {
  const add = await axios.get(`${localAPI}${_getWebsites}`);
  return add.data;
}
