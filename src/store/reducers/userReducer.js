import { ADD_USER, REMOVE_USER } from "../actions/type";
const init = {
  user: "",
};

export const userReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_USER:
      //   console.log(action.data, "reducer");
      const data = action.data;
      return {
        ...state,
        user: data,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: "",
      };
    default:
      return state;
  }
};
