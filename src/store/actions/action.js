import * as types from "./type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  addToCartService,
  addToCartWithQuantityService,
} from "../../apiService/addToCart";
import decrementCartItemService from "../../apiService/decrementCartItem";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  REMOVE_FROM_COMPARE_LIST,
  ADD_TO_COMPARE,
} from "./type";
import {
  decSubscribeItemAPI,
  editSubscribeItemAPI,
  subscribeItemAPI,
} from "../../apiService/subscribe";
import moment from "moment";
import { deleteSubItem } from "../../apiService/deleteSubItem";
import deleteCartItem from "../../apiService/deleteCartItem";
import { addToFav, deleteFavProduct } from "../../apiService/favourite";

export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN,
});

export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const addToCart = (product) => async (dispatch) => {
  toast.success("Item Added to Cart");
  const apiResponse = await addToCartService(product.id);
  dispatch({
    type: types.ADD_TO_CART,
    product,
    apiResponse,
  });
};

export const addToCartWithQuantity =
  (product, quantity) => async (dispatch) => {
    toast.success("Item Added to Cart");
    const apiResponse = await addToCartWithQuantityService(
      product.id,
      quantity
    );
    dispatch({
      type: types.ADD_TO_CART,
      product,
      apiResponse,
    });
  };

export const addSubToCart = (product, subscription) => async (dispatch) => {
  // console.log(product, subscription, "subscriptiontesting");
  const {
    startDate: fromDate,
    endDate: toDate,
    frequency,
    quantity,
    noOfDays,
  } = subscription;
  const freq = ["", "daily", "alternate", "3days/week"];
  let obj = {
    productId: product.id,
    fromDate: moment(fromDate).format("YYYY/MM/DD"),
    toDate: moment(toDate).format("YYYY/MM/DD"),
    noOfDays: noOfDays,
    quantity: quantity,
    frequency: freq[frequency],
  };
  const apiResponse = await subscribeItemAPI(obj);
  const apiRes = apiResponse.subscriptionDetails.filter(
    (item) => item.productDTO.id === product.id
  );

  const subBody = {
    startDate: new Date(apiRes[0].fromDate),
    endDate: new Date(apiRes[0].toDate),
    frequency: freq.findIndex((x) => x === apiRes[0].frequency),
    quantity: apiRes[0].productDTO.quantity,
    noOfDays: apiRes[0].noOfDays,
  };
  toast.success("Item Moved to Cart");
  dispatch({
    type: types.ADD_SUBS_PRODUCT_TO_CART,
    product,
    subBody,
  });
};

export const removeFromCart = (product_id) => async (dispatch) => {
  const apiResponse = await deleteCartItem(product_id);

  if (apiResponse.status == 200) {
    toast.success("Item Removed from Cart");
    dispatch({
      type: types.REMOVE_FROM_CART,
      product_id,
    });
  }
};

export const removeFromSubCart = (product_id) => async (dispatch) => {
  const apiResponse = await deleteSubItem(product_id);

  if (
    apiResponse.errorMessage ==
    "Sorry You do not have any Items in your your the cart!:( "
  ) {
    toast.success("Item Removed from Cart");
    dispatch({
      type: types.REMOVE_FROM_SUB_CART,
      product_id,
    });
  } else {
    const responseArr = apiResponse.subscriptionDetails.filter(
      (item) => item.productDTO.id === product_id
    );
    if (responseArr.length == 0) {
      toast.success("Item Removed from Cart");
      dispatch({
        type: types.REMOVE_FROM_SUB_CART,
        product_id,
      });
    }
  }
};
export const editSubProductCartItem =
  (subscription, product) => async (dispatch) => {
    console.log(subscription);
    const {
      startDate: fromDate,
      endDate: toDate,
      frequency,
      noOfDays,
    } = subscription;
    const freq = ["", "daily", "alternate", "3days/week"];
    let obj = {
      productId: product.id,
      fromDate: moment(fromDate).format("YYYY/MM/DD"),
      toDate: moment(toDate).format("YYYY/MM/DD"),
      noOfDays: noOfDays,
      frequency: freq[frequency],
    };
    const apiResponse = await editSubscribeItemAPI(obj);
    const apiRes = apiResponse.subscriptionDetails.filter(
      (item) => item.productDTO.id === product.id
    );

    const subBody = {
      startDate: new Date(apiRes[0].fromDate),
      endDate: new Date(apiRes[0].toDate),
      frequency: freq.findIndex((x) => x === apiRes[0].frequency),
      noOfDays: apiRes[0].noOfDays,
    };
    dispatch({
      type: types.EDIT_SUB_PRODUCT,
      subBody,
      product,
    });
  };

export const incrementQuantity = (product_id) => async (dispatch) => {
  const apiResponse = await addToCartService(product_id);
  dispatch({
    type: types.INCREMENT_QUANTITY,
    product_id,
    apiResponse,
  });
};
export const incrementSubQuantity = (product) => async (dispatch) => {
  const {
    startDate: fromDate,
    endDate: toDate,
    frequency,
    quantity,
    noOfDays,
  } = product.subscription;
  const freq = ["", "daily", "alternate", "3days/week"];
  let obj = {
    productId: product.id,
    fromDate: moment(fromDate).format("YYYY/MM/DD"),
    toDate: moment(toDate).format("YYYY/MM/DD"),
    noOfDays: noOfDays,
    quantity: 1,
    frequency: freq[frequency],
  };
  const apiResponse = await subscribeItemAPI(obj);
  const apiRes = apiResponse.subscriptionDetails.filter(
    (item) => item.productDTO.id === product.id
  );

  const subBody = {
    startDate: new Date(apiRes[0].fromDate),
    endDate: new Date(apiRes[0].toDate),
    frequency: freq.findIndex((x) => x === apiRes[0].frequency),
    quantity: apiRes[0].productDTO.quantity,
    noOfDays: apiRes[0].noOfDays,
  };
  dispatch({
    type: types.ADD_SUBS_PRODUCT_TO_CART,
    product,
    subBody,
  });
};

export const decrementQuantity = (product_id) => async (dispatch) => {
  const apiResponse = await decrementCartItemService(product_id);
  console.log(apiResponse);
  dispatch({
    type: types.DECREMENT_QUANTITY,
    product_id,
    apiResponse,
  });
};

export const decrementSubQuantity = (product) => async (dispatch) => {
  const {
    startDate: fromDate,
    endDate: toDate,
    frequency,
    quantity,
    noOfDays,
  } = product.subscription;
  const freq = ["", "daily", "alternate", "3days/week"];
  let obj = {
    productId: product.id,
    fromDate: moment(fromDate).format("YYYY/MM/DD"),
    toDate: moment(toDate).format("YYYY/MM/DD"),
    noOfDays: noOfDays,
    quantity: 1,
    frequency: freq[frequency],
  };
  const apiResponse = await decSubscribeItemAPI(obj);
  const apiRes = apiResponse.subscriptionDetails.filter(
    (item) => item.productDTO.id === product.id
  );

  const subBody = {
    startDate: new Date(apiRes[0].fromDate),
    endDate: new Date(apiRes[0].toDate),
    frequency: freq.findIndex((x) => x === apiRes[0].frequency),
    quantity: apiRes[0].productDTO.quantity,
    noOfDays: apiRes[0].noOfDays,
  };
  dispatch({
    type: types.ADD_SUBS_PRODUCT_TO_CART,
    product,
    subBody,
  });
};

export const addToWishList = (product) => async (dispatch, getState) => {
  const { wishList } = await getState();
  // console.log(wishList.w_list, "www");
  const isThere =
    wishList?.w_list.length == 0
      ? []
      : wishList?.w_list.filter((i) => i.id === product.id);
  let apiRes = "";
  if (isThere.length == 0) {
    console.log("if");
    apiRes = await addToFav(product.id);
    if (apiRes?.product?.id) {
      dispatch({
        type: ADD_TO_WISHLIST,
        product,
        favId: apiRes.id,
      });
    }
  } else {
    console.log("else");
    apiRes = await deleteFavProduct(isThere[0].favId);
    console.log(apiRes, "elseApiRes");

    dispatch({
      type: REMOVE_FROM_WISHLIST,
      id: product.id,
    });
  }
};

export const removeFromWishList = (id) => async (dispatch, getState) => {
  const { wishList } = await getState();
  const isThere = wishList?.w_list.filter((i) => i.id === id);
  let apiRes = await deleteFavProduct(isThere[0].favId);

  dispatch({
    type: REMOVE_FROM_WISHLIST,
    id,
  });
};

export const addToCompareList = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_COMPARE,
    product,
  });
};
export const removeFromCompareList = (product) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_COMPARE_LIST,
    product,
  });
};
