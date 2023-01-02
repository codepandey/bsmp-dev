import React from "react";
import { Link, useLocation } from "react-router-dom";

const PageTitle = (props) => {
  const loc = useLocation();
  const [image, setImage] = React.useState("tpbgimg-1");
  console.log(loc.search);
  React.useEffect(() => {
    if (loc.search === "?category=sweets") {
      setImage("tpbgimg-2");
    } else if (loc.search === "?category=dairy_products") {
      setImage("tpbgimg-1");
    }
  }, [props.cat]);
  // if (loc.search === "?category=sweets") {
  //   setImage("tpbgimg-2");
  // }

  return (
    <div
      className={`tp-breadcumb-area ${image}`}
      style={{ marginTop: "7.345%" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tp-breadcumb-wrap">
              <h2>{props.pageTitle}</h2>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <span>{props.pagesub}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-shape-img-1">
        <img src="" alt="" />
      </div>
      <div className="hero-shape-img-2">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default PageTitle;
