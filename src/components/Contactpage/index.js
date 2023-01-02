import React from "react";
import ContactForm from "../ContactFrom";

const Contactpage = () => {
  return (
    <section className="contact-pg-contact-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-6 col-12">
            <div className="section-title-s3 section-title-s5">
              <h2>Contacts Us</h2>
            </div>
            <div className="contact-details">
              <p>
                {" "}
                &nbsp; &nbsp;&nbsp; At Brahmshakti, We do our best to ensure the
                highest quality customer care to match our top quality product
                offerings. Please send us all your questions and feedback and we
                will answer in a timley fashion. Thank you for being a valued
                customer.
              </p>
              <ul>
                <li>
                  <div className="icon">
                    <i className="ti-location-pin"></i>
                  </div>
                  <h5>Our Location</h5>
                  <p>
                    BrahmShakti Milk Products,Near Sunarian chowk,Rohtak
                    124001,Haryana
                  </p>
                </li>
                <li>
                  <div className="icon">
                    <i className="ti-mobile"></i>
                  </div>
                  <h5>Phone</h5>
                  <p>+919996018032</p>
                </li>
                <li>
                  <div className="icon">
                    <i className="ti-email"></i>
                  </div>
                  <h5>Email</h5>
                  <p>brahmshakti@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col col-lg-6 col-12">
            <div className="contact-form-area">
              <div className="section-title-s3 section-title-s5">
                <h2>Quick Contact Form</h2>
              </div>
              <div className="contact-form">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-xs-12">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44295.691714495544!2d76.55545563989429!3d28.868672181703207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85a8da34151f%3A0xc72980210096b3fa!2sBrahmshakti%20milk%20products!5e0!3m2!1sen!2sin!4v1672675552490!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* <iframe
                title="contactMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.9668254772773!2d76.56986371500508!3d28.869604780062417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85a8da34151f%3A0xc72980210096b3fa!2sBrahmshakti%20milk%20products!5e0!3m2!1sen!2sin!4v1672675428721!5m2!1sen!2sin"
              ></iframe> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactpage;
