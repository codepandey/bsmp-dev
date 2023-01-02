import { host, baseUrl, removeFromCart, CONV_ID } from "../config/constant";
import { getLocalConvId } from "./localStorageItem";
const URL = host + baseUrl + removeFromCart;
const convId = getLocalConvId();
const incrementCartItem = async (id) => {
  try {
    const response = await fetch(URL + id + CONV_ID + convId, {
      method: "GET",
    });
    const format = await response.json();
    return format;
  } catch (error) {
    alert(error);
  }
};

export default incrementCartItem;
