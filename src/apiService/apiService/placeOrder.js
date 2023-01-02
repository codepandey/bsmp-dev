import { host, baseUrl, place_order } from "../config/constant";
const placeOrderURL = host + baseUrl + place_order;

export const placeOrderService = async (data) => {
  try {
    const response = await fetch(placeOrderURL, {
      method: "POST",
      body: data,
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
