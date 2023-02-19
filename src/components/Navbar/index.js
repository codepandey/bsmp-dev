import React from "react";
import { connect } from "react-redux";
import Header from "../header";

function Navbar(props) {
  const [scroll, setScroll] = React.useState(0);
  const handleScroll = () => setScroll(document.documentElement.scrollTop);
  const handleLogOut = () => props.dispatch({ type: "REMOVE_USER" });

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const className =
    scroll > 0 ? "fixed-navbar animated fadeInDown active" : "fixed-navbar";

  return (
    <div className={className}>
      <Header
        handleLogOut={() => handleLogOut()}
        hClass={props.hClass}
        location={props.location}
      />
    </div>
  );
}

export default connect()(Navbar);
