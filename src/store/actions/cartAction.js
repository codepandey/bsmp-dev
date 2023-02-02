import * as types from "./type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const addToOrderHistory = (cartItem) => (dispatch) => {
  // toast.success("Order Succ");
  console.log("came2");
  dispatch({
    type: types.ADDTO_ORDER_HISTORY,
    cartItem,
  });
  dispatch({
    type: types.EMPTY_SUB_PRODUCT,
    cartItem,
  });
};
