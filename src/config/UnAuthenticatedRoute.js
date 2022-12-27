import React, { cloneElement, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

function querystring(name, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");

  const results = regex.exec(url);
  // console.log(decodeURIComponent(results[2].replace(/\+/g, " ")), "result");

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute(props) {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    setAuth();
    window.addEventListener("storage", () => {
      setAuth();
    });
    return () => window.removeEventListener("storage", setAuth());
  }, []);
  const setAuth = async () => {
    let co = await localStorage.getItem("loggedUserId");
    setIsAuthenticated(co ? true : false);
  };
  const redirect = querystring("redirect");
  console.log("came came", isAuthenticated);
  if (isAuthenticated) {
    console.log(redirect, "red");
    return <Redirect to={redirect || "/home"} />;
  }

  return cloneElement(children, props);
}
