import axios from "axios";
import { host, baseUrl, removeFromCart, CONV_ID } from "../config/constant";
import { getLocalConvId } from "./localStorageItem";
const URL = host + "brahmashakti/" + "login";
const convId = getLocalConvId();
const otpService = async (contact) => {
  try {
    const response = await axios.post(URL + CONV_ID + convId, {
      contact: contact,
    });
    return response;
  } catch (error) {
    alert(error);
  }
};

export default otpService;
