import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Contactpage from "../../components/Contactpage";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Transitions from "../router/transition";

const ContactPage = () => {
  return (
    <Transitions>
      <Fragment>
        {/* <Navbar hClass={"header-style-2"} /> */}
        <PageTitle pageTitle={"Contact Us"} pagesub={"Contact"} />
        <Contactpage />
        <Footer />
        <Scrollbar />
      </Fragment>
    </Transitions>
  );
};
export default ContactPage;
