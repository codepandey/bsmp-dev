import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap-v5";
import DefaultModal from "../Modal";
import { connect } from "react-redux";

const Product = ({
  products,
  addToCartProduct,
  addToWishListProduct,
  userData,
}) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  const [state, setState] = useState({});
  const handleClickOpen = (item) => {
    setOpen(true);
    setState(item);
  };
  return (
    <section className="product-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title">
              <h2>
                Our Top <span>Picks</span>
              </h2>
              <p>Our Top Choices From Our Farms to Your Table.</p>
            </div>
          </div>
        </div>
        <div className="product-wrap">
          <div className="row align-items-center">
            {/* changes - 21/12/2022  */}
            {products.length > 0 &&
              products.slice(0, 3).map((product, pitem) => (
                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={pitem}>
                  <div className="product-item">
                    <div className="product-img">
                      <img src={product.image} alt="" />
                      <ul>
                        <li>
                          <button
                            data-bs-toggle="tooltip"
                            data-bs-html="true"
                            title="Add to Cart"
                            onClick={() => addToCartProduct(product)}
                          >
                            <i className="fi flaticon-shopping-cart"></i>
                          </button>
                        </li>
                        <li>
                          <button
                            data-bs-toggle="tooltip"
                            data-bs-html="true"
                            title="Quick View"
                            onClick={() => handleClickOpen(product)}
                          >
                            <i className="fi ti-eye"></i>
                          </button>
                        </li>
                        {userData !== "" && (
                          <li>
                            <button
                              data-bs-toggle="tooltip"
                              data-bs-html="true"
                              title="Add to Wishlist"
                              onClick={() => addToWishListProduct(product)}
                            >
                              <i className="fi flaticon-like"></i>
                            </button>
                          </li>
                        )}
                      </ul>
                      <div className="offer-thumb">
                        <span>
                          {product.discount === 0
                            ? "-15 %"
                            : `-${product.discount} %`}
                        </span>
                      </div>
                    </div>
                    <div className="product-content">
                      <h3>
                        <Link
                          onClick={ClickHandler}
                          to={`/product-single/${product.id}`}
                        >
                          {product.title}
                        </Link>
                      </h3>
                      <div className="product-btm">
                        <div className="product-price">
                          <ul>
                            <li>???{product.price}</li>
                            <li>???{parseInt(product.price * 1.15)}</li>
                          </ul>
                        </div>
                        <div className="product-ratting">
                          {/* <ul>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </li>
                          </ul> */}
                          <Button
                            className="cBtnTheme"
                            onClick={() => addToCartProduct(product)}
                            style={{ border: "none" }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                        {/* <Button className="cBtnTheme" onClick={()=>addToCartProduct(product)} style={{border: 'none'}}>Add to Cart</Button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <DefaultModal
        addToCartProduct={addToCartProduct}
        open={open}
        onClose={handleClose}
        product={state}
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData.user,
  };
};
export default connect(mapStateToProps)(Product);
