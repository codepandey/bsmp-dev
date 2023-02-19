import { combineReducers } from "redux";
import productReducer from "./products";
import { cartReducer } from "./cart";
import { wishListReducer } from "./wishList";
import compareListReducer from "./compare";
import { subCartReducer } from "./subCart";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  userData: userReducer,
  data: productReducer,
  cartList: cartReducer,
  subCartList: subCartReducer,
  wishList: wishListReducer,
  compareList: compareListReducer,
});

export default rootReducer;
