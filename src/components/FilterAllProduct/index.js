import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import ProductGrid from "../ProductGrid";
import ProductList from "../ProductList";
import { getLocalUserDetail } from "../../apiService/localStorageItem";

const FilterAllProduct = ({
  products,
  addToCartProduct,
  addToWishListProduct,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isLoggedIn, setLoggedIn] = useState(false);
  React.useEffect(() => {
    window.addEventListener("storage", logFunc);
    logFunc();
  }, []);
  const logFunc = () => {
    let res = getLocalUserDetail();
    if (res) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="col-lg-8">
      <div className="shop-section-top-inner">
        <div className="shoping-list">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                <i className="fa fa-th "></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                <i className="fa fa-list"></i>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="shoping-product">
          {/* changes 08/12/2022 */}
          <span>
            Showing Products {products.length} Of {products.length} Result
          </span>
        </div>
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ProductGrid
            isLoggedIn={isLoggedIn}
            addToCartProduct={addToCartProduct}
            addToWishListProduct={addToWishListProduct}
            products={products}
          />
        </TabPane>

        <TabPane tabId="2">
          <ProductList
            isLoggedIn={isLoggedIn}
            addToCartProduct={addToCartProduct}
            addToWishListProduct={addToWishListProduct}
            products={products}
          />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default FilterAllProduct;
