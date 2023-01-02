import { host, baseUrl, removeFromCart } from "../config/constant";
const URL = host + baseUrl + removeFromCart + "all/";
// const URL="http://ec2-15-206-209-235.ap-south-1.compute.amazonaws.com:8080/brahmashakti/api/bs-cart/remove/"

const incrementCartItem = async (id) => {
  try {
    const response = await fetch(URL + id, { method: "GET" });
    const format = await response.json();
    return format;
  } catch (error) {
    alert(error);
  }
};

export default incrementCartItem;
