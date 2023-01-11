import React, { Fragment, useEffect } from "react";
// import Navbar from "../../components/Navbar";
import CheckoutSection from "../../components/CheckoutSection";
// import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { connect } from "react-redux";

import Transitions from "../router/transition";
import { checkOutService } from "../../apiService/checkout";

const CheckoutPage = ({ cartList }) => {
  const [checkoutRes, setCheckoutRes] = React.useState();
  useEffect(() => {
    console.log("cameCheckout ");
    const checkSer = async () => {
      const res = await checkOutService();
      console.log(res);
      setCheckoutRes(res);
    };
    checkSer();
  }, []);
  return (
    <Transitions>
      <Fragment>
        {/* <Navbar hClass={"header-style-1"} /> */}
        {/* <PageTitle pageTitle={"Checkout"} pagesub={"Checkout"} /> */}
        <CheckoutSection cartList={cartList} checkoutRes={checkoutRes} />
        <Footer />
        <Scrollbar />
      </Fragment>
    </Transitions>
  );
};
const mapStateToProps = (state) => {
  return {
    cartList: state.cartList.cart,
    symbol: state.data.symbol,
  };
};

export default connect(mapStateToProps)(CheckoutPage);
