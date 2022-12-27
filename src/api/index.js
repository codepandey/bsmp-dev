// import data from './data_copy.json';
import axios from "axios";

export default async () => {
  let data = [];
  data = await axios
    .get(
      "http://ec2-15-206-209-235.ap-south-1.compute.amazonaws.com:8080/brahmashakti/api/bs-products"
    )
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e, "errror");
    });
  return data;
};
