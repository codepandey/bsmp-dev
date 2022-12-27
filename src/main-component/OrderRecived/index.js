import React, { Fragment } from "react";
import { connect } from "react-redux";
import OrderRecivedSec from "../../components/OrderRecivedSec";
import Transitions from "../router/transition";

const OrderRecived = ({ cartList }) => {
  return (
    <Transitions>
      <Fragment>
        <OrderRecivedSec cartList={cartList} />
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

export default connect(mapStateToProps)(OrderRecived);
