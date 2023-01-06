import { host, baseUrl, removeFromCart, CONV_ID } from "../config/constant";
import { getLocalConvId } from "./localStorageItem";
const URL = host + baseUrl + removeFromCart + "all/";
const convId = getLocalConvId();
const deleteCartItem = async (id) => {
  try {
    const response = await fetch(URL + id + CONV_ID + convId, {
      method: "GET",
    });
    const format = response;
    return format;
  } catch (error) {
    alert(error);
  }
};

export default deleteCartItem;
