import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import FontAwesome from "../../components/UiStyle/FontAwesome";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link, useHistory } from "react-router-dom";
import { totalPrice } from "../../utils";

// images
import visa from "../../images/icon/visa.png";
import mastercard from "../../images/icon/mastercard.png";
import skrill from "../../images/icon/skrill.png";
import paypal from "../../images/icon/paypal.png";

import CheckWrap from "../CheckWrap";

import "./style.scss";
import { addToOrderHistory } from "../../store/actions/cartAction";
import { connect } from "react-redux";
import { addUserAddress, getUserAddress } from "../../apiService/userAddress";
import { placeOrderService } from "../../apiService/placeOrder";

const cardType = [
  {
    title: "visa",
    img: visa,
  },
  {
    title: "mastercard",
    img: mastercard,
  },
  {
    title: "skrill",
    img: skrill,
  },
  {
    title: "paypal",
    img: paypal,
  },
];

const DemoAddress = {
  fname: "Condi gence",
  district: "Rohtak",
  address: " 323/4 model town, behind D park, Rohtak",
  post_code: "124001",
  email: "condigence@gmail.com",
  phone: localStorage.getItem("Contact"),
  note: "home address",
};

const CheckoutSection = ({ cartList, addToOrderHistory, checkoutRes }) => {
  console.log(checkoutRes, "checkoutRes");
  const history = useHistory();
  // states
  const [tabs, setExpanded] = React.useState({
    cupon: false,
    billing_adress: false,
    payment: true,
  });
  const [userData, setUserData] = useState({
    city: "Rohtak",
    contact: localStorage.getItem("Contact"),
    country: "India",
    userId: localStorage.getItem("loggedUserId"),
    isDefault: false,
    line1: "",
    line2: "",
    pin: "124001",
    state: "Haryana",
  });
  const [userAddressArr, setUserAddressArr] = useState([]);
  const [forms, setForms] = React.useState({
    cupon_key: "",
    fname: "",
    lname: "",
    district: "",
    dristrict: "",
    address: "",
    post_code: "",
    email: "",
    phone: "",
    note: "",

    payment_method: "card",
    card_type: "",

    fname2: "",
    lname2: "",
    country2: "",
    dristrict2: "",
    address2: "",
    post_code2: "",
    email2: "",
    phone2: "",

    card_holder: "",
    card_number: "",
    cvv: "",
    expire_date: "",
  });
  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    let cc = localStorage.getItem("Contact");
    setForms({ ...forms, ...DemoAddress, phone: cc });
  }, []);
  useEffect(() => {
    (async () => {
      const res = localStorage.getItem("loggedUserId");
      let addresseArr = await getUserAddress(res);
      setUserAddressArr([...addresseArr]);
      let selectedAdd = addresseArr.filter((item) => item.isDefault == "Y");
      setSelectedAddress(selectedAdd[0]?.id);
    })();
  }, []);
  const [dif_ship, setDif_ship] = React.useState(false);

  // tabs handler
  function faqHandler(name) {
    setExpanded({
      cupon: false,
      billing_adress: false,
      payment: true,
      [name]: !tabs[name],
    });
  }

  // forms handler
  const changeHandler = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
    setUserData({ ...userData, [e.target.name]: e.target.value });

    console.log(e.target.name, "form");
  };

  //complete order
  const handleCompleteOrder = async (cartItem) => {
    const res = await placeOrderService(checkoutRes);
    addToOrderHistory(cartItem);
    if (res.status == 200 || res.status == 201) {
      history.push("/order_received");
    }
  };
  const addAddress = async () => {
    const res = await addUserAddress(userData);
    setUserAddressArr([...userAddressArr, res]);
  };

  return (
    <Fragment>
      <Grid className="checkoutWrapper section-padding">
        <Grid className="container" container spacing={3}>
          <Grid item md={6} xs={12}>
            <div
              className="check-form-area"
              style={{ background: "rgba(93, 116, 60, 0.2392156863)" }}
            >
              <Grid className="cuponWrap checkoutCard">
                <Button
                  className="collapseBtn"
                  style={{ background: "#449735" }}
                  fullWidth
                  onClick={() => faqHandler("cupon")}
                >
                  Have a coupon ? Click here to enter your code.
                  <FontAwesome name={tabs.cupon ? "minus" : "plus"} />
                </Button>
                <Collapse in={tabs.cupon} timeout="auto" unmountOnExit>
                  <Grid className="chCardBody">
                    <p>If you have coupon code,please apply it</p>
                    <form className="cuponForm">
                      <TextField
                        fullWidth
                        type="text"
                        className="formInput radiusNone"
                        value={forms.cupon_key}
                        name="cupon_key"
                        onChange={(e) => changeHandler(e)}
                      />
                      <Button className="cBtn cBtnBlack">Apply</Button>
                    </form>
                  </Grid>
                </Collapse>
              </Grid>
              <Grid className="cuponWrap checkoutCard">
                <Button
                  className="collapseBtn"
                  fullWidth
                  style={{ background: "#449735" }}
                  onClick={() => faqHandler("billing_adress")}
                >
                  Billing Address
                  <FontAwesome name={!tabs.billing_adress ? "minus" : "plus"} />
                </Button>
                <Collapse
                  in={!tabs.billing_adress}
                  timeout="auto"
                  unmountOnExit
                >
                  <Grid className="chCardBody">
                    <Grid
                      container
                      spacing={3}
                      style={{
                        padding: 10,
                        justifyContent: "flex-start",
                        borderBottomColor: "red",
                      }}
                    >
                      {userAddressArr.length > 0 && (
                        <Grid item sm={6} xs={12}>
                          <InputLabel id="demo-simple-select-filled-label1">
                            Saved Address
                          </InputLabel>
                          <FormControl
                            className="formSelect"
                            fullWidth
                            variant="filled"
                          >
                            <Select
                              labelId="demo-simple-select-filled-label1"
                              id="demo-simple-select-filled1"
                              value={selectedAddress || ""}
                              name="district"
                              onChange={(e) => {
                                console.log(selectedAddress);
                                setSelectedAddress(e.target.value);
                                console.log(e.target.value);
                              }}
                            >
                              {userAddressArr.length > 0 &&
                                userAddressArr.map((address) => {
                                  return address.isDefault !== "Y" ? (
                                    <MenuItem
                                      value={address.id}
                                      key={address.id}
                                    >
                                      {`${address.line1.slice(0, 15)}`}
                                    </MenuItem>
                                  ) : (
                                    <MenuItem
                                      value={address.id}
                                      key={address.id}
                                    >
                                      {`Primary ${address.line1.slice(0, 10)}`}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>
                    <form className="cuponForm">
                      <Grid container spacing={3}>
                        <Collapse in={!dif_ship} timeout="auto" unmountOnExit>
                          <Grid container spacing={3}>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                fullWidth
                                label="Full Name"
                                name="fname"
                                // disabled={true}
                                value={"Virender"}
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="formInput radiusNone"
                              />
                            </Grid>
                            {/* <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            name="lname"
                            value={forms.lname}
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className="formInput radiusNone"
                          />
                        </Grid> */}
                            <Grid item sm={6} xs={12}>
                              <InputLabel id="demo-simple-select-filled-label">
                                District
                              </InputLabel>
                              <FormControl
                                className="formSelect"
                                fullWidth
                                variant="filled"
                              >
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={userData.city}
                                  name="district"
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      city: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={"Rohtak"}>
                                    Rohtak City
                                  </MenuItem>
                                  {/* <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                              </FormControl>
                            </Grid>
                            {/* <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Dristrict"
                            name="dristrict"
                            value={forms.dristrict}
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className="formInput radiusNone"
                          />
                        </Grid> */}
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                multiline
                                rows="3"
                                label="Address"
                                name="line1"
                                value={userData.line1}
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="formInput radiusNone"
                              />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                fullWidth
                                label="Post Code"
                                name="pin"
                                value={userData.pin}
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="formInput radiusNone"
                              />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                              <TextField
                                fullWidth
                                // disabled={true}
                                label="Email Adress"
                                name="email"
                                value={forms.email}
                                onChange={(e) => changeHandler(e)}
                                type="email"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="formInput radiusNone"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Phone No"
                                // disabled={true}
                                name="contact"
                                value={userData.contact}
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                className="formInput radiusNone"
                              />
                            </Grid>
                          </Grid>
                        </Collapse>
                        <Grid item xs={12}>
                          <FormControlLabel
                            className="checkBox"
                            control={
                              <Checkbox
                                checked={dif_ship}
                                onChange={() => setDif_ship(!dif_ship)}
                                value={dif_ship}
                                color="primary"
                              />
                            }
                            label="Ship to a different address?"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Collapse in={dif_ship} timeout="auto" unmountOnExit>
                            <Grid container spacing={3}>
                              <Grid item sm={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="First Name"
                                  name="fname2"
                                  value={forms.fname2}
                                  onChange={(e) => changeHandler(e)}
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  className="formInput radiusNone"
                                />
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Last Name"
                                  name="lname2"
                                  value={forms.lname2}
                                  onChange={(e) => changeHandler(e)}
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  className="formInput radiusNone"
                                />
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <InputLabel id="demo-simple-select-filled-label">
                                  Age
                                </InputLabel>
                                <FormControl
                                  className="formSelect"
                                  fullWidth
                                  variant="filled"
                                >
                                  <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={forms.country2}
                                    name="country2"
                                    onChange={(e) => changeHandler(e)}
                                  >
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Dristrict"
                                  name="dristrict2"
                                  value={forms.dristrict2}
                                  onChange={(e) => changeHandler(e)}
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  className="formInput radiusNone"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows="3"
                                  label="Address"
                                  name="address2"
                                  value={forms.address2}
                                  onChange={(e) => changeHandler(e)}
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  className="formInput radiusNone"
                                />
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Post Code"
                                  name="post_code2"
                                  value={forms.post_code2}
                                  onChange={(e) => changeHandler(e)}
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  className="formInput radiusNone"
                                />
                              </Grid>
                              <Grid item sm={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Email Adress"
                                  name="email2"
                                  value={forms.email2}
                                  onChange={(e) => changeHandler(e)}
                                  type="email"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  className="formInput radiusNone"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Phone No"
                                  name="phone2"
                                  value={forms.phone2}
                                  onChange={(e) => changeHandler(e)}
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  className="formInput radiusNone"
                                />
                              </Grid>
                            </Grid>
                          </Collapse>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            label="Order Notes"
                            placeholder="Note about your order"
                            name="note"
                            value={forms.note}
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className="formInput radiusNone note"
                          />
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                  <Grid className="cardType">
                    <FormControlLabel
                      className="checkBox"
                      control={
                        <Checkbox
                          checked={userData.isDefault}
                          onChange={() =>
                            setUserData({
                              ...userData,
                              isDefault: !userData.isDefault,
                            })
                          }
                          value={userData.isDefault}
                          color="primary"
                        />
                      }
                      label="Primary Address"
                    />
                    <Button
                      // to="/order_received"
                      onClick={() => {
                        addAddress(forms);
                      }}
                      className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                      type="submit"
                    >
                      ADD ADDRESS
                    </Button>
                  </Grid>
                </Collapse>
              </Grid>
              <Grid className="cuponWrap checkoutCard">
                <Button
                  className="collapseBtn"
                  fullWidth
                  style={{ background: "#449735" }}
                  onClick={() => faqHandler("payment")}
                >
                  Payment Method
                  <FontAwesome name={tabs.payment ? "minus" : "plus"} />
                </Button>
                <Grid className="chCardBody">
                  <Collapse in={tabs.payment} timeout="auto">
                    <RadioGroup
                      className="paymentMethod"
                      aria-label="Payment Method"
                      name="payment_method"
                      value={forms.payment_method}
                      onChange={(e) => changeHandler(e)}
                    >
                      <FormControlLabel
                        value="cash"
                        control={<Radio color="primary" />}
                        label="Payment By Card "
                      />
                      <FormControlLabel
                        value="card"
                        control={<Radio color="primary" />}
                        label="Cash On delivery"
                      />
                    </RadioGroup>
                    <Collapse
                      in={forms.payment_method === "cash"}
                      timeout="auto"
                    >
                      <Grid className="cardType">
                        {cardType.map((item, i) => (
                          <Grid
                            key={i}
                            className={`cardItem ${
                              forms.card_type === item.title ? "active" : null
                            }`}
                            onClick={() =>
                              setForms({ ...forms, card_type: item.title })
                            }
                          >
                            <img src={item.img} alt={item.title} />
                          </Grid>
                        ))}
                      </Grid>
                      <Grid>
                        <CheckWrap />
                      </Grid>
                    </Collapse>
                    <Collapse
                      in={forms.payment_method === "card"}
                      timeout="auto"
                    >
                      <Grid className="cardType">
                        <Button
                          // to="/order_received"
                          onClick={() => {
                            handleCompleteOrder(cartList);
                          }}
                          className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                          // type="submit"
                        >
                          Place Order
                        </Button>
                      </Grid>
                    </Collapse>
                  </Collapse>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid
              className="cartStatus"
              style={{ background: "rgba(93, 116, 60, 0.2392156863)" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid className="cartTotals">
                    <h4>Cart Total</h4>
                    <Table>
                      <TableBody>
                        {cartList.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {item.title} ₹{item.price} x {item.quantity}
                            </TableCell>
                            <TableCell align="right">
                              ₹{item.quantity * item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="totalProduct">
                          <TableCell>Total product</TableCell>
                          <TableCell align="right">{cartList.length}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Sub Price</TableCell>
                          <TableCell align="right">
                            ₹{totalPrice(cartList)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total Price</TableCell>
                          <TableCell align="right">
                            ₹{totalPrice(cartList)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default connect(null, { addToOrderHistory })(CheckoutSection);
