import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  ADDTO_ORDER_HISTORY,
} from "../actions/type";
import { minValueOne } from "../../utils";

const init = {
  cart: [],
  orderHistory: [],
};

export const cartReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productId = action.product.id;
      const itemArray = action.apiResponse.itemDetails;
      const itemIndex = itemArray?.findIndex(
        (item) => item.productDTO.id === productId
      );

      if (state.cart.findIndex((product) => product.id === productId) !== -1) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.id === productId) {
            cartAcc.push({
              ...product,
              ...itemArray[itemIndex]?.productDTO,
            }); // Increment qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            ...itemArray[itemIndex]?.productDTO,
          },
        ],
      };
    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter((item) => item.id !== action.product_id),
      };

    case INCREMENT_QUANTITY:
      const inc_productId = action.product_id;
      const index = action.apiResponse.itemDetails.findIndex(
        (item) => item.productDTO.id === inc_productId
      );

      const new_cart = state.cart.reduce((cartAcc, product) => {
        if (product.id === inc_productId) {
          cartAcc.push({
            ...product,
            quantity: action.apiResponse.itemDetails[index].productDTO.quantity,
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);
      return { ...state, cart: new_cart };

    case DECREMENT_QUANTITY:
      const decProductId = action.product_id;
      const dArray = action.apiResponse.itemDetails;
      const dIndex = dArray.findIndex(
        (item) => item.productDTO.id === decProductId
      );
      if (dIndex == -1) {
        return {
          cart: state.cart.filter((item) => item.id !== action.product_id),
        };
      }

      const decCart = state.cart.reduce((cartAcc, product) => {
        if (product.id === decProductId) {
          cartAcc.push({
            ...product,
            quantity: dArray[dIndex].productDTO.quantity,
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, cart: decCart };

    case ADDTO_ORDER_HISTORY:
      const cart = action.cartItem;
      const history = state.orderHistory;
      // const updateOrderHistory = history.push([...cart]);
      return {
        ...state,
        orderHistory: [],
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
