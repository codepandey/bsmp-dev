import { host, baseUrl, bs_sub } from "../config/constant";
import { getLocalUserDetail } from "./localStorageItem";
const MY_SUB_URL = host + baseUrl + bs_sub;

export const mySubscription = async () => {
  const userData = await getLocalUserDetail();
  try {
    const response = await fetch(MY_SUB_URL + userData.id, {
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
