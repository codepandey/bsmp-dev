import { host, baseUrl, unsubscribeItem, CONV_ID } from "../config/constant";
import { getLocalConvId } from "./localStorageItem";
const URL = host + baseUrl + unsubscribeItem + CONV_ID;
const convId = getLocalConvId();
export const deleteSubItem = async (productId) => {
  try {
    const response = await fetch(URL + convId, {
      method: "POST",
      body: JSON.stringify({ productId: productId }),
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
