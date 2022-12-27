import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

export default function AuthenticatedRoute({ children }) {
  const { pathname, search } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState();
  useEffect(() => {
    let co = localStorage.getItem("loggedUserId");
    setIsAuthenticated(co ? true : false);
    window.addEventListener("storage", (e) => {
      let co = localStorage.getItem("loggedUserId");
      setIsAuthenticated(co ? true : false);
    });
  }, []);

  if (!localStorage.getItem("loggedUserId")) {
    return (
      <Redirect
        to={`/login?redirect=${pathname}${search}`}
        from={`${pathname}${search}`}
      />
    );
  }

  return children;
}
