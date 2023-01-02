import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import Hero from "../../components/hero";
import Category from "../../components/Category";
import Product from "../../components/Product";
import OfferSection from "../../components/OfferSection";
import FlashSale from "../../components/FlashSale";
import Project from "../../components/Project";
import Service from "../../components/Service";
import Testimonial from "../../components/Testimonial";
import Client from "../../components/Client";
import BlogSection from "../../components/BlogSection";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { addToCart, addToWishList } from "../../store/actions/action";
import axios from "axios";
import api from "../../api";
import Transitions from "../router/transition";
import Hero2 from "../../components/hero2";
import { getLocalUserDetail } from "../../apiService/localStorageItem";

const HomePage = ({ addToCart, addToWishList }) => {
  const [pData, setPData] = useState([]);

  const addToCartProduct = (product, qty = 1) => {
    addToCart(product, qty);
  };
  const addToWishListProduct = (product, qty = 1) => {
    addToWishList(product, qty);
  };
  const [isLoggedIn, setLoggedIn] = React.useState(false);
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
  useEffect(() => {
    const fetchProducts = async () => {
      const productsArray = await api();
      const products = productsArray;
      setPData(products || []);
    };
    fetchProducts();
  }, []);
  return (
    <Transitions>
      <Fragment>
        {/* <Navbar hClass={"header-style-1"} /> */}
        <Hero2 />
        <Category />
        <Product
          isLoggedIn
          addToCartProduct={addToCartProduct}
          addToWishListProduct={addToWishListProduct}
          products={pData}
        />
        <OfferSection />
        <FlashSale
          isLoggedIn
          addToCartProduct={addToCartProduct}
          addToWishListProduct={addToWishListProduct}
          products={pData}
        />
        {/* <Project /> */}
        <Service />
        {/* <Testimonial /> */}
        {/* <Client /> */}
        {/* <BlogSection /> */}
        <Footer />
        <Scrollbar />
      </Fragment>
    </Transitions>
  );
};
export default connect(null, { addToCart, addToWishList })(HomePage);
