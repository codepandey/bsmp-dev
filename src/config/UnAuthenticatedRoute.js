import React, { cloneElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function querystring(name, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);
  if (!results || !results[2]) {
    return false;
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function UnauthenticatedRoute(props) {
  const { children, userData } = props;
  const redirect = querystring("redirect");
  console.log("came ", userData, redirect);
  if (userData) {
    return <Redirect to={redirect || "/home"} />;
  }

  return cloneElement(children, props);
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData.user,
  };
};
export default connect(mapStateToProps)(UnauthenticatedRoute);
