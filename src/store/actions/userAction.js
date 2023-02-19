import * as types from "./type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const addUserData = (data) => (dispatch) => {
  console.log(data, "reducer");
  // dispatch({
  //   type: types.ADD_USER,
  //   data,
  // });
};
export const removeUserData = (data) => (dispatch) => {
  dispatch({
    type: types.REMOVE_USER,
    data,
  });
};
