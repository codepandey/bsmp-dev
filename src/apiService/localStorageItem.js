import uuid from "react-uuid";

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
  const res = localStorage.getItem("userData");
  return JSON.parse(res);
};
