import { host, baseUrl, place_order } from "../config/constant";
import { getLocalUserDetail } from "./localStorageItem";
const orderhistoryURL = host + baseUrl + place_order + "order-history/";

export const getOrderHisotry = async () => {
  const userData = await getLocalUserDetail();
  try {
    const response = await fetch(orderhistoryURL + userData.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const format = response;
    return format;
  } catch (error) {
    alert(error);
  }
};
