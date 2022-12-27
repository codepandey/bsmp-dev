import {
  baseUrl,
  host,
  addEmailName,
  getAddress,
  addAddress,
} from "../config/constant";
const GET_URL = host + baseUrl + getAddress;
const ADD_URL = host + baseUrl + addAddress;
const ADD_EMAIL_NAME_URL = host + baseUrl + addEmailName;
export const getUserAddress = async (id) => {
  try {
    const response = await fetch(GET_URL + id, { method: "GET" });
    const format = await response.json();
    return format;
  } catch (error) {
    alert(error);
  }
};

export const addUserAddress = async (userData) => {
  try {
    const response = await fetch(ADD_URL, {
      method: "POST",
      body: JSON.stringify(userData),
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

export const addUserNameEmail = async (userData) => {
  try {
    const response = await fetch(ADD_EMAIL_NAME_URL, {
      method: "POST",
      body: JSON.stringify(userData),
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
