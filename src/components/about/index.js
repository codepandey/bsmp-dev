import React from "react";
import { Link } from "react-router-dom";
import VideoModal from "../ModalVideo";
import abimg from "../../images/abou2.jpg";
import all from "../../images/all_in_one.png";

// changes - 21/12/2022
// changes - 10/12/2022

const About = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  return (
    <>
      <section className="about-section section-padding p-t-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col col-lg-5 col-12">
              <div className="video-area">
                <img src={abimg} alt="" />
                <div className="video-holder">
                  <VideoModal />
                </div>
              </div>
            </div>
            <div className="col col-lg-7 col-12">
              <div className="about-area">
                <div className="about-wrap">
                  <div className="about-title">
                    {/* <small>About our Company</small> */}
                    {/* changes - 12/10/2022 */}
                    {/* <h2>All in one <span>to make a</span> different structure</h2> */}
                    <h2>Our Story</h2>
                  </div>
                  <p>
                    &nbsp; &nbsp;&nbsp; We grew up drinking fresh milk from our
                    village cattle. It was not until our family moved to the
                    bigger cities that we began to notice that people were
                    missing out on the flavor and nutrition that fresh milk
                    provides. Therefore, we have made it our mission to preserve
                    and share our dairy with the world!<br></br>
                    &nbsp; &nbsp;&nbsp; At Brahm Shakti, we offer the freshest
                    farm-to-table dairy products, sweets and vegetables
                    delivered straight to your door via our user-friendly web
                    store! Being a small-town family farm means we take pride in
                    raising our own cattle to a higher organic standard. Our
                    ongoing commitment to sustainable farming ensures our
                    mission of adding exceptional community value not found in
                    our competition.
                  </p>
                  {/* <Link onClick={ClickHandler} to="/about" className="btn theme-btn" >More About<i className="fa fa-angle-double-right"></i></Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section section-padding p-t-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col col-lg-5 col-12">
              <div className="video-area">
                {/* changes - 21/12/2022 */}
                <img src={all} alt="" />
                {/* <div className="video-holder">
                                <VideoModal/>
                            </div> */}
              </div>
            </div>
            <div className="col col-lg-7 col-12">
              <div className="about-area">
                <div className="about-wrap">
                  <div className="about-title">
                    {/* <small>About our Company</small> */}
                    {/* changes - 12/10/2022 */}
                    {/* changes - 22/12/2022 */}
                    {/* <h2>All in one <span>to make a</span> different structure</h2> */}
                    <h2>Our Products</h2>
                  </div>
                  <p>
                    &nbsp; &nbsp;&nbsp; We truly want to WOW your senses when
                    you try our fresh dairy products! Our happy, family cows
                    produce fresh milk, cheese, cream, ghee and yoghurt. We also
                    carry a rotating selection of all your favourite milk-based,
                    made-to-order sweets and home grown in-season vegetables.
                  </p>
                  {/* <Link onClick={ClickHandler} to="/about" className="btn theme-btn" >More About<i className="fa fa-angle-double-right"></i></Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
