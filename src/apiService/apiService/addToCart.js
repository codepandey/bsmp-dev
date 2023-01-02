import { baseUrl, host, addToCart, CONV_ID, bsCart } from "../config/constant";
import { getLocalConvId } from "./localStorageItem";

const URL = host + baseUrl + addToCart;
const GET_CART_URL = host + baseUrl + bsCart;

const convId = getLocalConvId();

export const getCartSerice = async () => {
  try {
    const response = await fetch(GET_CART_URL + CONV_ID + convId, {
      method: "GET",
    });
    const format = await response.json();
    return format;
  } catch (error) {
    console.log(error);
  }
};
export const addToCartService = async (productId) => {
  try {
    console.log(convId);
    const response = await fetch(URL + productId + CONV_ID + convId, {
      method: "GET",
    });
    const format = await response.json();
    return format;
  } catch (error) {
    console.log(error);
  }
};
export const addToCartWithQuantityService = async (productId, qauntity) => {
  let bodyObj = {
    id: productId,
    quantity: qauntity,
  };
  console.log(bodyObj);
  let newUrl = URL.slice(0, -1);
  try {
    const response = await fetch(newUrl + CONV_ID + convId, {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const format = await response.json();
    return format;
  } catch (error) {
    console.log(error);
  }
};
