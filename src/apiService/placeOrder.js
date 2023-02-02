import { host, baseUrl, place_order } from "../config/constant";
import { getLocalUserDetail } from "./localStorageItem";
const placeOrderURL = host + baseUrl + place_order;

export const placeOrderService = async (data, addrId) => {
  const userData = await getLocalUserDetail();
  let body = {
    userId: userData.id,
    paymentMethod: "UPI",
    cartId: data.id,
  };
  console.log(body, "body");
  try {
    const response = await fetch(placeOrderURL, {
      method: "POST",
      body: JSON.stringify(body),
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
