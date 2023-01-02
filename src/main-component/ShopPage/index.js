import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import FilterSidebar from "../../components/FilterSidebar";
import FilterAllProduct from "../../components/FilterAllProduct";
import api from "../../api";
import { addToCart, addToWishList } from "../../store/actions/action";
import Transitions from "../router/transition";
const ShopPage = ({ addToCart, addToWishList, ...props }) => {
  const [productsArray, setProductsArray] = useState([]);
  const cat = window.location.href.split("=")[1];
  useEffect(() => {
    const category = window.location.href.split("=")[1];
    console.log(category);
    const getProducts = async () => {
      const pArray = await api();
      const productsArray = pArray.filter((item) => {
        if (category == "dairy_products") {
          if (item.category == "Dairy Products") {
            return item;
          }
        } else if (category == "sweets") {
          if (item.category == "Sweets") {
            return item;
          }
        }
      });
      console.log("productsArray", productsArray);
      setProductsArray(productsArray);
    };
    getProducts();
  }, [props.location.search]);
  console.log(props.location.search);

  const [filter, setFilter] = useState({
    price: "",
    size: "",
    color: "",
    brand: "",
  });
  const [search, setSearch] = useState("");
  const priceChangeHandler = ({ target: { name, value } }) => {
    const val = typeof value === "string" ? JSON.parse(value) : value;
    setFilter({ ...filter, [name]: val });
  };

  const changeHandler = ({ target: { name, value } }) => {
    setFilter({ ...filter, [name]: value });
  };

  const addToCartProduct = (product) => {
    addToCart(product);
  };

  var products = productsArray.filter((product) => {
    if (
      product.title
        .toUpperCase()
        .includes(search.toUpperCase().trim().replace(/\s/g, ""))
    )
      return product;
  });
  const addToWishListProduct = (products) => {
    addToWishList(products);
  };

  return (
    <Transitions>
      <Fragment>
        {/* <Navbar hClass={"header-style-2"} /> */}
        <PageTitle pageTitle={"Shop"} pagesub={"Shop"} cat={cat} />
        <div className="shop-section">
          <div className="container">
            <div className="row">
              <FilterSidebar
                filter={filter}
                search={search}
                setSearch={setSearch}
                priceChangeHandler={priceChangeHandler}
                changeHandler={changeHandler}
              />
              <FilterAllProduct
                addToCartProduct={addToCartProduct}
                addToWishListProduct={addToWishListProduct}
                products={products}
              />
            </div>
          </div>
        </div>
        <Footer />
        <Scrollbar />
      </Fragment>
    </Transitions>
  );
};

export default connect(null, { addToCart, addToWishList })(ShopPage);
