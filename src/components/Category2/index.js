import React from "react";
import { Link } from "react-router-dom";
// changes - 10/12/2022
import veggies from "../../images/vegges.png";
import dairyImage from "../../images/milk.png";
import sweets from "../../images/sweets.png";

const Category2 = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  return (
    // changes - 10/12/2022
    <section className={`category-area-s2 section-padding ${props.StyleClass}`}>
      <div className="container">
        <div className="category-wrap">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-12">
              <div className="category-item">
                <div className="category-icon">
                  <img src={veggies} alt="" />
                </div>
                <div className="category-content">
                  <h2>
                    <Link onClick={ClickHandler} to="/shop">
                      Vegetables
                    </Link>
                  </h2>
                  <p>
                    Our Organic Farm Fresh  </p>
                    <p>Vegetables Will Add</p>
                    <p> Veriety To Your Meals.</p>
                  
                  <Link
                    style={{
                      color: "green",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={ClickHandler}
                    to="/shop?category=vegetables"
                  >
                    Take me to Vegetable Products
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-12">
              <div className="category-item">
                <div className="category-icon">
                  <img src={dairyImage} alt="" />
                </div>
                <div className="category-content">
                  <h2>
                    <Link onClick={ClickHandler} to="/shop">
                      Dairy Products
                    </Link>
                  </h2>
                  <p>
                    Fresh Diary Products Like Milk, <br/>
                        Dahi, Ghee & many more
                    <p>Delivered at Your Door Step </p>
                  </p>
                  <Link
                    style={{
                      color: "green",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={ClickHandler}
                    to="/shop?category=dairy_products"
                  >
                    Take me to Dairy Products
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-12">
              <div className="category-item">
                <div className="category-icon">
                  <img src={sweets} alt="" />
                </div>
                <div className="category-content">
                  <h2>
                    <Link onClick={ClickHandler} to="/shop">
                      Sweets
                    </Link>
                  </h2>
                  <p>
                    We Carry All Your Favouite Milk 
                    Beats Sweets Perfect for<br/>
                    Gifts and Special Occasions.<br/>
                  </p>
                  <Link
                    style={{
                      color: "green",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={ClickHandler}
                    to="/shop?category=sweets"
                  >
                    Take me to Sweet Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category2;
