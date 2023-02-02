import moment from "moment";
import React from "react";
import { Modal } from "reactstrap";
import "./style.css";

const OrderHistoryBox = ({ order }) => {
  console.log(order);
  return (
    <>
      <div className="col-lg-4 col-sm-12 col-12" style={{ padding: 10 }}>
        <div className="order-history-box">
          <div className="order-id">
            Order Number: {order.number.slice(0, 8)}
          </div>
          <div className="title">
            Items
            <p className="product-name">
              <Items
                items={order.cartDTO.itemDetails}
                subItems={order.cartDTO.subscriptionDetails}
              />
            </p>
          </div>

          <div className="title">
            Date of Purchase{" "}
            <p className="product-name">
              {moment(new Date(order.dateTime)).format(
                "MMM DD,YYYY [at] hh:mm A"
              )}
            </p>
          </div>
          <div className="title">
            Payment Method
            <p className="product-name">{order.paymentMethod}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="total">Total:₹ {order.grandTotal}</div>
            <div className="details-button">View Details</div>
          </div>
        </div>
      </div>
      <ModalView />
    </>
  );
};
const ModalView = () => {
  return <Modal backdrop={true}></Modal>;
};

const Items = ({ items, subItems }) => {
  let products = items.map(
    (item) => `${item.productDTO.title}  x  ${item.itemQuantity}`
  );
  let subProducts = subItems.map(
    (item) =>
      `${item.productDTO.title}  x  ${item.itemQuantity}(${item.frequency})`
  );
  return (
    <span>
      {products.join(" , ")}
      {products.length > 0 && subProducts.length > 0 ? " , " : ""}
      {subProducts.join(",")}
    </span>
  );
};

export default OrderHistoryBox;
