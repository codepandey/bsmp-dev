import uuid from "react-uuid";
import { store } from "../store/index";
export const getLocalConvId = () => {
  let convId = localStorage.getItem("convId");
  if (!convId) {
    let newConvId = setLocalConvId();
    return newConvId;
  }
  return convId;
};
export const setLocalConvId = () => {
  let convId = uuid();
  localStorage.setItem("convId", convId);
  return convId;
};

export const getLocalUserDetail = () => {
  var user = store.getState().userData.user;
  return user;
};

store.subscribe(getLocalUserDetail);
