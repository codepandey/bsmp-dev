import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import logo from "../../images/Logo_bsmp.jpeg";
import backgroundLogin from "../../images/login_page1.png";

import "./style1.scss";
import Transitions from "../router/transition";

const SignUpPage = (props) => {
  const [value, setValue] = useState({
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
  });

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: "errorWarning",
    })
  );

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      setValue({
        email: "",
        full_name: "",
        password: "",
        confirm_password: "",
      });
      validator.hideMessages();
      toast.success("Registration Complete successfully!");
      props.history.push("/login");
    } else {
      validator.showMessages();
      toast.error("Empty field is not allowed!");
    }
  };
  return (
    <Transitions>
      <>
        <div className="body">
          <img src={backgroundLogin} className="bodyImage" />
        </div>
        <Grid className="loginWrapper1">
          <Grid className="loginForm">
            <div className="section-title mb-0">
              <h2 style={{ fontSize: "24px" }}>
                <span>Welcome to </span> Brahmshakti
              </h2>
            </div>
            <h2>Register</h2>
            {/* <p>Signup your account</p> */}
            <form onSubmit={submitForm}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    className="inputOutline"
                    fullWidth
                    placeholder="Full Name"
                    value={value.full_name}
                    variant="outlined"
                    name="full_name"
                    label="Name *"
                    InputLabelProps={{
                      shrink: true,
                      // color:"secondary"
                    }}
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                  />
                  {validator.message(
                    "full name",
                    value.full_name,
                    "required|alpha"
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="inputOutline"
                    fullWidth
                    placeholder="E-mail (Optional)"
                    value={value.email}
                    variant="outlined"
                    name="email"
                    label="E-mail"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                  />
                  {validator.message("email", value.email, "optional|email")}
                </Grid>
                <Grid item xs={12}>
                  <Grid className="formFooter">
                    <Button
                      fullWidth
                      className="cBtn cBtnLarge cBtnTheme"
                      type="submit"
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
              </Grid>
            </form>
            {/* <div className="shape-img">
                    <img src={logo} alt="No Image" />
                    
                </div> */}
            {/* <div className="shape-img">
                    <i className="fi flaticon-honeycomb"></i>
                </div> */}
          </Grid>
        </Grid>
      </>
    </Transitions>
  );
};

export default SignUpPage;
