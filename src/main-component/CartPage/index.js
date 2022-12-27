import React, { Fragment, useState } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import EditModal from "../../components/EditModal";
import { Button, Grid } from "@material-ui/core";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { totalPrice } from "../../utils";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  removeFromSubCart,
  incrementSubQuantity,
  decrementSubQuantity,
  editSubProductCartItem,
} from "../../store/actions/action";
import "./style.css";
import { checkOutService } from "../../apiService/checkout";
import Transitions from "../router/transition";

const CartPage = (props) => {
  const [showEditModal, setShowEditModal] = useState(0);
  const [editModalProduct, setEditModalProduct] = useState({});
  const ClickHandler = () => {
    // window.scrollTo(10, 0);
  };
  const handleCheckout = async () => {
    await checkOutService();
  };

  const { carts, subCarts } = props;

  const subscriptionType = (type) => {
    if (type === 1) return "Everyday";
    else if (type === 2) return "3 Days(Tue,Thu,Sat)";
    else if (type === 3) return "Alternate";
  };
  const editChanges = (sub) => {
    props.editSubProductCartItem(sub, editModalProduct);
  };
  console.log(props);
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.13,
        staggerChildren: 0.15,
      },
    },
  };
  const modalVarient = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <Transitions>
      <Fragment>
        {/* <Navbar hClass={"header-style-1"} /> */}
        {/* <PageTitle pageTitle={"Cart"} pagesub={"Cart"} /> */}
        <div
          // onContextMenu={(e) => {
          //   e.preventDefault();
          //   debugger;
          // }}
          className="cart-area section-padding"
          onClick={() => {
            if (showEditModal === 1) setShowEditModal(0);
          }}
          style={{
            overflow: showEditModal !== 0 ? "hidden" : "initial",
            height: showEditModal !== 0 ? "100%" : "auto",
          }}
        >
          <div className="container">
            <div className="form">
              <div className="cart-wrapper">
                <div className="row">
                  <div className="col-12">
                    <form action="cart">
                      <table className="table-responsive cart-wrap">
                        <thead>
                          <tr>
                            <th className="images images-b">Image</th>
                            <th className="product-2">Product Name</th>
                            <th className="pr">Quantity</th>
                            <th className="ptice">Price</th>
                            <th className="stock">Total Price</th>
                            <th className="remove remove-b">Action</th>
                          </tr>
                        </thead>
                        <motion.tbody
                          variants={container}
                          initial="hidden"
                          animate="visible"
                        >
                          {carts &&
                            carts.length > 0 &&
                            carts.map((catItem, crt) => {
                              const item = {
                                hidden: { y: 20, opacity: 0 },
                                visible: {
                                  y: 0,
                                  opacity: 1,
                                },
                              };
                              if (catItem.quantity < 1) return <></>;
                              return (
                                <motion.tr
                                  variants={item}
                                  key={crt}
                                  className="normalCart"
                                >
                                  <td className="images">
                                    <img src={catItem.image} alt="" />
                                  </td>
                                  <td className="product">
                                    <ul>
                                      <li className="first-cart">
                                        {catItem.title}
                                      </li>
                                      {/* <li>Brand : {catItem.brand}</li>
                                  <li>Size : {catItem.size}</li> */}
                                    </ul>
                                  </td>
                                  <td className="stock">
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{
                                        scale: 1,
                                        // rotate: ,
                                        // borderRadius: "100%",
                                      }}
                                      className="pro-single-btn"
                                    >
                                      <Grid className="quantity cart-plus-minus">
                                        <Button
                                          className="dec qtybutton"
                                          onClick={() =>
                                            props.decrementQuantity(catItem.id)
                                          }
                                        >
                                          -
                                        </Button>
                                        <input
                                          readOnly
                                          value={catItem.quantity}
                                          type="text"
                                        />
                                        <Button
                                          className="inc qtybutton"
                                          onClick={() =>
                                            props.incrementQuantity(catItem.id)
                                          }
                                        >
                                          +
                                        </Button>
                                      </Grid>
                                    </motion.div>
                                  </td>
                                  <td className="ptice">₹{catItem.price}</td>
                                  <td className="stock">
                                    ₹{catItem.quantity * catItem.price}
                                  </td>
                                  <td className="action">
                                    <ul>
                                      <li
                                        className="w-btn"
                                        onClick={() =>
                                          props.removeFromCart(catItem.id)
                                        }
                                      >
                                        <i className="fi flaticon-delete"></i>
                                      </li>
                                    </ul>
                                  </td>
                                </motion.tr>
                              );
                            })}
                          {subCarts &&
                            subCarts.length > 0 &&
                            subCarts.map((catItem, crt) => {
                              const item = {
                                hidden: { y: 20, opacity: 0 },
                                visible: {
                                  y: 0,
                                  opacity: 1,
                                },
                              };
                              return (
                                <motion.tr
                                  variants={item}
                                  key={crt}
                                  className="subCart"
                                >
                                  <td className="images">
                                    <img src={catItem.image} alt="" />
                                  </td>
                                  <td className="product">
                                    <ul>
                                      <li className="first-cart">
                                        {catItem.title}
                                      </li>
                                      <li className="freq-cart">
                                        {subscriptionType(
                                          catItem.subscription.frequency
                                        )}
                                      </li>
                                      <li>
                                        For {catItem.subscription.noOfDays} days
                                      </li>
                                      <motion.li layout={showEditModal}>
                                        <h6
                                          style={{
                                            cursor: "pointer",
                                            color: "#6e6e6e",
                                            textDecoration: "underline",
                                          }}
                                          onClick={() => {
                                            setShowEditModal(1 - showEditModal);
                                            setEditModalProduct(catItem);
                                          }}
                                          // onBlur={()=>{setShowEditModal(0)}}
                                        >
                                          Edit
                                        </h6>
                                      </motion.li>
                                    </ul>
                                  </td>
                                  <td className="stock">
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{
                                        scale: 1,
                                        // rotate: -90,
                                        borderRadius: "100%",
                                      }}
                                      className="pro-single-btn"
                                    >
                                      <Grid className="quantity cart-plus-minus">
                                        <Button
                                          className="dec qtybutton"
                                          disabled={
                                            catItem.subscription.quantity == 1
                                              ? true
                                              : false
                                          }
                                          onClick={() =>
                                            props.decrementSubQuantity(catItem)
                                          }
                                        >
                                          {catItem.subscription.quantity == 1
                                            ? ""
                                            : "-"}
                                        </Button>
                                        <input
                                          readOnly
                                          style={{ cursor: "default" }}
                                          value={catItem.subscription.quantity}
                                          type="text"
                                        />
                                        <Button
                                          className="inc qtybutton"
                                          onClick={() =>
                                            props.incrementSubQuantity(catItem)
                                          }
                                        >
                                          +
                                        </Button>
                                      </Grid>
                                    </motion.div>
                                  </td>
                                  <td className="ptice">₹ {catItem.price}</td>
                                  <td className="stock">
                                    ₹{" "}
                                    {catItem.subscription.noOfDays *
                                      catItem.subscription.quantity *
                                      catItem.price}
                                  </td>
                                  <td className="action">
                                    <ul>
                                      <li
                                        className="w-btn"
                                        onClick={() =>
                                          props.removeFromSubCart(catItem.id)
                                        }
                                      >
                                        <i className="fi flaticon-delete"></i>
                                      </li>
                                    </ul>
                                  </td>
                                </motion.tr>
                              );
                            })}
                        </motion.tbody>
                      </table>
                    </form>

                    <div className="submit-btn-area">
                      <ul>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            className="theme-btn"
                            to="/shop"
                          >
                            Continue Shopping{" "}
                            <i className="fa fa-angle-double-right"></i>
                          </Link>
                        </li>
                        <li>
                          <button type="submit">Update Cart</button>
                        </li>
                      </ul>
                    </div>
                    <div className="cart-product-list">
                      <ul>
                        <li>
                          Total product<span>( {carts.length} )</span>
                        </li>
                        <li>
                          Sub Price<span>₹{totalPrice(carts)}</span>
                        </li>
                        <li>
                          Vat<span>₹0</span>
                        </li>
                        <li>
                          Eco Tax<span>₹0</span>
                        </li>
                        <li>
                          Delivery Charge<span>₹0</span>
                        </li>
                        <li className="cart-b">
                          Total Price<span>₹{totalPrice(carts)}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="submit-btn-area">
                      <ul>
                        <li>
                          <Link
                            onClick={() => handleCheckout()}
                            className="theme-btn"
                            to={{
                              pathname: "/checkout",
                            }}
                          >
                            Proceed to Checkout{" "}
                            <i className="fa fa-angle-double-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <Scrollbar />
        <AnimatePresence
          onExitComplete={() => {
            console.log("came");
          }}
        >
          {showEditModal === 1 && (
            <motion.div
              layoutId={showEditModal}
              key={showEditModal}
              // initial={{ opacity: 0, scale: 0 }}
              // animate={{ scale: 1, opacity: 1 }}
              // exit={{ scale: 0, opacity: 0 }}
              // transition={{
              //   type: "spring",
              //   stiffness: 260,
              //   damping: 20,
              // }}
            >
              <EditModal
                editChanges={editChanges}
                editModalProduct={editModalProduct}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Fragment>
    </Transitions>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
    subCarts: state.subCartList.subCart,
  };
};
export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  removeFromSubCart,
  decrementSubQuantity,
  incrementSubQuantity,
  editSubProductCartItem,
})(CartPage);
