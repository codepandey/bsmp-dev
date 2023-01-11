import {
  host,
  baseUrl,
  CONV_ID,
  bsCart,
  USER_ID,
  checkOut,
} from "../config/constant";
import { getLocalConvId, getLocalUserDetail } from "./localStorageItem";
const URL = host + baseUrl + bsCart + checkOut;
const convId = getLocalConvId();

export const checkOutService = async () => {
  const userData = await getLocalUserDetail();
  const USER_ID1 = USER_ID.replace("?", "&");
  try {
    const response = await fetch(
      URL + CONV_ID + convId + USER_ID1 + userData.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const format = await response.json();
    return format;
  } catch (error) {
    alert(error);
  }
};
