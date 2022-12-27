import axios from "axios";
import { host, CONV_ID } from "../config/constant";
import { getLocalConvId } from "./localStorageItem";
const URL = host + "brahmashakti/" + "validate-otp";
const convId = getLocalConvId();

const confirmOtpService = async (contact, otp) => {
  try {
    const response = await axios.post(URL + CONV_ID + convId, { contact, otp });
    return response;
  } catch (error) {
    alert(error);
  }
};

export default confirmOtpService;
