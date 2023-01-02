import {
  host,
  baseUrl,
  subscribeItem,
  editSubDetail,
  decSubscribeItem,
  CONV_ID,
} from "../config/constant";
import { getLocalConvId } from "./localStorageItem";
const convId = getLocalConvId();
const SUB_URL = host + baseUrl + subscribeItem + CONV_ID + convId;
const EDIT_SUB_URL = host + baseUrl + editSubDetail + CONV_ID + convId;
const DEC_SUB_ITEM_URL = host + baseUrl + decSubscribeItem + CONV_ID + convId;

export const subscribeItemAPI = async (obj) => {
  try {
    const response = await fetch(SUB_URL, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const format = await response.json();
    return format;
  } catch (error) {
    alert(error);
  }
};

export const editSubscribeItemAPI = async (obj) => {
  try {
    const response = await fetch(EDIT_SUB_URL, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const format = await response.json();
    return format;
  } catch (error) {
    alert(error);
  }
};
export const decSubscribeItemAPI = async (obj) => {
  try {
    const response = await fetch(DEC_SUB_ITEM_URL, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const format = await response.json();
    return format;
  } catch (error) {
    alert(error);
  }
};
