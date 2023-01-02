import {
  host,
  baseUrl,
  CONV_ID,
  bsCart,
  USER_ID,
  checkOut,
} from "../config/constant";
import { getLocalConvId } from "./localStorageItem";
const URL = host + baseUrl + bsCart + checkOut;
const convId = getLocalConvId();
const userId = localStorage.getItem("loggedUserId");
export const checkOutService = async () => {
  try {
    const response = await fetch(URL + CONV_ID + convId + USER_ID + userId, {
      method: "GET",
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