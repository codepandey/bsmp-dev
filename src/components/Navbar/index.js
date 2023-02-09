import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header";

export default function Navbar(props) {
  const [scroll, setScroll] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);
  const handleLogOut = () => {
    localStorage.removeItem("loggedUserId");
    localStorage.removeItem("userData");
    localStorage.removeItem("Contact");
    window.dispatchEvent(new Event("storage"));
    setIsLoggedIn(null);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const res = localStorage.getItem("loggedUserId");
    const resUser = localStorage.getItem("userData");
    setIsLoggedIn(res);
    setUserData(resUser);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [props.location]);
  // React.useEffect(() => {
  //   let res = localStorage.getItem("loggedUserId");
  //   setIsLoggedIn(res);
  //   window.addEventListener("storage", (e) => {
  //     let res = localStorage.getItem("loggedUserId");
  //     setIsLoggedIn(res);
  //   });
  // }, []);

  const className =
    scroll > 0 ? "fixed-navbar animated fadeInDown active" : "fixed-navbar";

  return (
    <div className={className}>
      <Header
        handleLogOut={() => {
          handleLogOut();
          console.log("came");
        }}
        userData={userData}
        isLoggedIn={isLoggedIn}
        hClass={props.hClass}
        location={props.location}
      />
    </div>
  );
}
