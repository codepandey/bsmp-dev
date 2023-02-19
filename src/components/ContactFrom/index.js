import React, { Component } from "react";
import { connect } from "react-redux";
import { contactUsService } from "../../apiService/contactUs";

class ContactForm extends Component {
  state = {
    name: "",
    email: "",
    // subject: "",
    phone: "",
    message: "",
    error: {},
  };

  componentDidMount() {
    this.setState({
      name: this?.props?.userData?.profile?.firstName || "",
      email: this?.props?.userData?.email || "",
      phone: this?.props?.userData?.contact || "",
      error: {},
    });
  }

  changeHandler = (e) => {
    const error = this.state.error;
    error[e.target.name] = "";

    this.setState({
      [e.target.name]: e.target.value,
      error,
    });
  };

  subimtHandler = (e) => {
    e.preventDefault();

    const { name, email, subject, phone, error, message } = this.state;

    if (name === "") {
      error.name = "Please enter your name";
    } else if (phone === "" || phone.length < 10) {
      error.phone = "Please enter your mobile number";
    } else if (email === "") {
      error.email = "Please enter your email";
    } else if (message === "") {
      error.message = "Please enter your message";
    } else {
    }

    if (error) {
      this.setState({
        error,
      });
    }
    if (
      (error.name === "" || error.name == undefined) &&
      (error.email === "" || error.email == undefined) &&
      (error.phone === "" || error.phone == undefined) &&
      error.message === ""
    ) {
      let bodyObj = {
        name: name,
        email: email,
        contact: phone,
        message: message,
      };
      console.log(bodyObj);
      contactUsService(bodyObj);
      this.setState({
        // name: "",
        // email: "",
        // phone: "",
        message: "",
        error: {},
      });
    }
  };

  render() {
    const { name, email, subject, phone, error, message } = this.state;

    return (
      <form onSubmit={this.subimtHandler} className="form">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                disabled={this?.props?.userData?.profile?.fullName}
                value={name}
                onChange={this.changeHandler}
                type="text"
                name="name"
                placeholder="Name"
              />
              <p>{error.name ? error.name : ""}</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                disabled={this?.props?.userData?.contact}
                value={phone}
                onChange={this.changeHandler}
                type="number"
                name="phone"
                placeholder="Mobile No"
              />
              <p>{error.phone ? error.phone : ""}</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                disabled={this?.props?.userData?.email}
                onChange={this.changeHandler}
                value={email}
                type="email"
                name="email"
                placeholder="Email"
              />
              <p>{error.email ? error.email : ""}</p>
            </div>
          </div>
          {/* <div className="col-lg-6 col-md-6 col-12">
            <div className="form-field">
              <input
                onChange={this.changeHandler}
                value={subject}
                type="text"
                name="subject"
                placeholder="Subject"
              />
              <p>{error.subject ? error.subject : ""}</p>
            </div>
          </div> */}
          <div className="col-lg-12">
            <div className="form-field">
              <textarea
                name="message"
                onChange={this.changeHandler}
                placeholder="Message"
                value={message}
              ></textarea>
              <p>{error.message ? error.message : ""}</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-submit">
              <button type="submit" className="theme-btn">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData.user,
  };
};
export default connect(mapStateToProps)(ContactForm);
