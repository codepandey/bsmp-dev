import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

function AuthenticatedRoute({ children, userData }) {
  const { pathname, search } = useLocation();
  if (userData == "") {
    return (
      <Redirect
        to={`/login?redirect=${pathname}${search}`}
        from={`${pathname}${search}`}
      />
    );
  }

  return children;
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData.user,
  };
};
export default connect(mapStateToProps)(AuthenticatedRoute);
