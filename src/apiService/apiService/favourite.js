import { host, baseUrl, add_fav } from "../config/constant";
import { getLocalUserDetail } from "./localStorageItem";
const favURL = host + baseUrl + add_fav;

export const addToFav = async (data) => {
  const userData = getLocalUserDetail();
  const body = {
    productId: data,
    userId: userData.id,
  };
  try {
    const response = await fetch(favURL, {
      method: "POST",
      body: JSON.stringify(body),
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

export const getFavProduct = async () => {
  const userData = getLocalUserDetail();
  try {
    const response = await fetch(favURL + userData.id, {
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
export const deleteFavProduct = async (data) => {
  const userData = getLocalUserDetail();
  const body = {
    productId: data,
    userId: userData.id,
  };
  try {
    const response = await fetch(favURL, {
      method: "DELETE",
      body: JSON.stringify(body),
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
