import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { removeFromWishList, addToCart } from "../../store/actions/action";
import pImage from "../../images/MilkBottle.webp";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { totalPrice } from "../../utils";
import moment from "moment";
// import "./style.scss";
import "./style.css";
import Transitions from "../router/transition";
import { getOrderHisotry } from "../../apiService/orderhistory";
import OrderHistoryBox from "../../components/OrderHistoryCard";

const OrderHistoryPage = (props) => {
  const { cartList, subCartList } = props;
  const [activeHeading, setActiveHeading] = useState(0);
  const [orderData, setOrderData] = React.useState([]);
  const date = new Date();
  React.useEffect(() => {
    orderHistoryService();
  }, []);
  const orderHistoryService = async () => {
    const res = await getOrderHisotry();
    setOrderData(res || []);
  };

  return (
    <Transitions>
      <Fragment>
        {/* <Navbar hClass={"header-style-2"} /> */}
        <PageTitle pageTitle={"Order History"} pagesub={"Order History"} />
        <div className="cart-area section-padding">
          <div className="container">
            {/* <div className="row">
              <div className="heading-type">
                <span
                  onClick={() => {
                    setActiveHeading(0);
                  }}
                  className={activeHeading === 0 ? "activeheading" : "headings"}
                >
                  Usual Orders
                </span>
                <span
                  onClick={() => {
                    setActiveHeading(1);
                  }}
                  className={activeHeading == 1 ? "activeheading" : "headings"}
                >
                  Subscription Orders
                </span>
              </div>
            </div> */}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                // columnGap: 20,
              }}
            >
              {orderData.map((item) => {
                return <OrderHistoryBox key={item.number} order={item} />;
              })}
            </div>
          </div>
        </div>
        <Footer />
        <Scrollbar />
      </Fragment>
    </Transitions>
  );
};

const mapStateToProps = (state) => {
  return {
    cartList: state.cartList.cart,
    subCartList: state.subCartList.subCart,
    symbol: state.data.symbol,
  };
};
export default connect(mapStateToProps)(OrderHistoryPage);
// export default OrderHistoryPage;
