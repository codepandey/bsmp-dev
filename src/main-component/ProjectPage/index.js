import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import Project from "../../components/Project";
import Stepper from "../../components/Stepper";
import Transitions from "../router/transition";

const ProjectPage = (props) => {
  const cartEditItem = props.history.location.state;
  return (
    <Transitions>
      <Fragment>
        {/* <Navbar hClass={"header-style-2"} /> */}
        <PageTitle pageTitle={"Subscribe"} pagesub={"Subscribe"} />
        <Stepper cartEditItem={cartEditItem} />
        {/* <Project/> */}
        <Footer />
        <Scrollbar />
      </Fragment>
    </Transitions>
  );
};
export default ProjectPage;
