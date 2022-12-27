import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Input, Typography, TextField } from "@material-ui/core";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import backgroundLogin from "../../images/login_page1.png";
import otpService from "../../apiService/otpService";
import confirmOtpService from "../../apiService/confirmOtpService";
import Transitions from "../router/transition";
import { addUserNameEmail } from "../../apiService/userAddress";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import Loader from "../../components/loader";
import "./style1.scss";

const LoginPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState("");
  const [registerValue, setRegisterValue] = useState({
    email: "",
    full_name: "",
  });

  const [value, setValue] = useState({
    contact: "",
    otp: "",
  });
  const [otp, setOtp] = useState("");
  const [renderStep, setRenderStep] = useState(1);
  const [isRegistered, setIsRegistered] = useState();

  const handleRegisterContact = (e) => {
    setRegisterValue({ ...registerValue, [e.target.name]: e.target.value });
    validator.showMessages();
  };
  const handleRegister = async () => {
    let userData = {
      contact: contact,
      email: registerValue.email,
      fullName: registerValue.full_name,
    };
    let res = await addUserNameEmail(userData);
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...res, name: registerValue.full_name })
    );
    // console.log(res, "response");
  };

  const handleContact = (e) => {
    setContact(e.target.value.replace(/[^0-9]/g, ""));
  };

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.contact]: e.target.value });
    // console.log(e.target.value);
    validator.showMessages();
  };
  const otpRendering = async () => {
    if (/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(contact)) {
      const otpSendResponse = await otpService(contact);
      setIsRegistered(otpSendResponse?.data?.registered);
      setRenderStep(2);
      return true;
    } else {
      validator.showMessages();
      toast.error("Contact Number is not valid!");
      return false;
    }
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );

  const confirmOtp = async () => {
    setIsLoading(true);
    const responseconfirm = await confirmOtpService(contact, otp);
    // console.log(responseconfirm, "res");
    setOtp("");
    if (
      (responseconfirm.status === 200 || responseconfirm.status === 202) &&
      isRegistered
    ) {
      console.log(responseconfirm.data);
      localStorage.setItem("loggedUserId", responseconfirm.data.id);
      localStorage.setItem("Contact", contact);
      localStorage.setItem("userData", JSON.stringify(responseconfirm.data));
      window.dispatchEvent(new Event("storage"));
    } else if (
      (responseconfirm.status === 200 || responseconfirm.status === 202) &&
      !isRegistered
    ) {
      setRenderStep(3);
    }
  };

  const resendOTP = () => {
    // console.log("Resend OTP");
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      setValue({
        contact: "",
        otp: "",
      });
      validator.hideMessages();

      const userRegex = /^user+.*/gm;
      const contact = value.contact;

      if (contact.match(userRegex)) {
        toast.success("You successfully Login !");
        props.history.push("/home");
      }
    } else {
      validator.showMessages();
      toast.error("Empty field is not allowed!");
    }
  };

  return (
    <Transitions>
      <div className="body">
        <img src={backgroundLogin} className="bodyImage" alt="" />
      </div>
      <Grid className="loginWrapper1">
        <Grid className="loginForm">
          <div className="mb-0" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "24px" }}>
              <span>Welcome to </span> Brahmshakti
            </h2>
          </div>
          <h2>Sign {renderStep === 1 ? "In" : renderStep === 3 && "Up"}</h2>

          {/* <p>Sign in to your account</p> */}
          <form onSubmit={submitForm}>
            <Grid container spacing={3} style={{ marginTop: 100 }}>
              {renderStep === 1 && (
                <Grid item xs={12}>
                  <Input
                    className="inputOutline"
                    fullWidth
                    placeholder="Contact"
                    value={contact}
                    variant="outlined"
                    name="contact"
                    label="Contact"
                    inputlabelprops={{
                      shrink: true,
                    }}
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => handleContact(e)}
                  />
                  <Grid className="formFooter">
                    <Button
                      disabled={contact.length < 10}
                      onClick={otpRendering}
                      fullWidth
                      className={`${
                        contact.length < 10 ? "cBtnCustom" : "cBtnTheme"
                      }`}
                      type="submit"
                    >
                      Get OTP
                    </Button>
                  </Grid>
                </Grid>
              )}
              {renderStep === 2 && (
                <Grid item xs={12}>
                  {!isLoading ? (
                    <>
                      <Grid item xs>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{ textAlign: "center" }}
                        >
                          Enter the code sent to {contact} &nbsp;
                          <Link
                            className="icon"
                            onClick={() => setRenderStep(1)}
                          >
                            <i className="ti-pencil"></i>
                          </Link>
                        </Typography>
                      </Grid>
                      <OtpInput
                        value={otp}
                        type="password"
                        onChange={(otp) => {
                          // console.info(otp);
                          setOtp(otp);
                        }}
                        numInputs={4}
                        inputStyle={{
                          fontSize: "24px",
                          width: "36px",
                          height: "36px",
                          margin: "4px",
                          borderTop: "0px",
                          borderLeft: "0px",
                          borderRight: "0px",
                          outline: "none",
                          borderColor: "#000a46",
                        }}
                        containerStyle={{
                          margin: "20px auto",
                          padding: "10px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        isInputNum
                      />
                      <Link style={{ fontSize: "small" }} onClick={resendOTP}>
                        Resend OTP
                      </Link>

                      <Grid className="formFooter">
                        <Button
                          className={`${
                            otp.length < 4 ? "cBtnCustom" : "cBtnTheme"
                          }`}
                          disabled={otp.length < 4}
                          fullWidth
                          type="number"
                          onClick={confirmOtp}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Loader isLoading={isLoading} setIsLoading={setIsLoading} />
                  )}
                </Grid>
              )}
              {renderStep === 3 && (
                <>
                  <Grid
                    item
                    xs={12}
                    style={{ justifyContent: "space-between" }}
                  >
                    <TextField
                      className="inputOutline"
                      fullWidth
                      placeholder="Full Name"
                      value={registerValue.full_name || ""}
                      variant="outlined"
                      name="full_name"
                      label="Name *"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleRegisterContact(e)}
                      onBlur={(e) => handleRegisterContact(e)}
                    />

                    {
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                        }}
                      >
                        {validator.message(
                          "full name",
                          registerValue.full_name,
                          "required|alpha"
                        )}
                      </span>
                    }

                    <TextField
                      className="inputOutline  mt-4"
                      fullWidth
                      placeholder="E-mail (Optional)"
                      value={registerValue.email || ""}
                      variant="outlined"
                      name="email"
                      label="E-mail"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleRegisterContact(e)}
                      onBlur={(e) => handleRegisterContact(e)}
                    />

                    <Grid className="formFooter">
                      <Button
                        disabled={registerValue.full_name !== "" ? false : true}
                        fullWidth
                        className="cBtn cBtnLarge cBtnTheme"
                        type="submit"
                        onClick={() => {
                          handleRegister();
                          setRenderStep(1);
                        }}
                      >
                        Proceed
                      </Button>
                    </Grid>
                    {/* <Grid className="loginWithSocial">
                                <Button className="facebook"><i className="fa fa-facebook"></i></Button>
                                <Button className="twitter"><i className="fa fa-twitter"></i></Button>
                                <Button className="linkedin"><i className="fa fa-linkedin"></i></Button>
                            </Grid>
                            <p className="noteHelp">Already have an account? <Link to="/login">Return to Sign In</Link>
                            </p> */}
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Transitions>
  );
};

export default LoginPage;
