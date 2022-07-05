import axios from "axios";
import { URL } from "../../App.service";

const requestOptions = {
  /*  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  }, */
};

function getItem() {
  const response = axios.get(URL + "getItem", requestOptions);
  return response;
}

function addNewItem(data) {
  const response = axios.post(URL + "addNewItem", data, requestOptions);
  return response;
}

function getItemId(id) {
  const response = axios.get(URL + "getItemId/" + id, requestOptions);
  return response;
}

function updateItem(id, data) {
  const response = axios.put(URL + "updateItem/" + id, data);
  return response;
}

function deleteItem(id) {
  const response = axios.delete(URL + "deleteItem/" + id);
  return response;
}
export const service = {
  getItem,
  addNewItem,
  getItemId,
  updateItem,
  deleteItem
};
