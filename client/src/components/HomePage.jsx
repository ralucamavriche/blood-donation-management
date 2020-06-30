import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faUserCircle,
  faHeart,
  faPhone,
  faEnvelope,
  faMapMarked
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "./shared/Spinner";
import Alert from "./shared/Alert/Alert";

function HomePage(props) {
  if (props.main.feedbacks.length === 0) return <Spinner/>;
  else
    return (
      <>
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-10 align-self-end">
                <h1 className="text-uppercase text-white font-weight-bold">
                  Blood donation has never been easier
                </h1>
                <hr className="divider my-4" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                <p className="text-white-75 font-weight-light mb-5">
                  We believe that this is the only way we will succeed. And as a
                  team, and as a country. We trust each other and welcome them
                  with open arms on each of those who want to get involved.
                </p>
                <a
                  className="btn btn-primary btn-xl js-scroll-trigger"
                  href="#about"
                >
                  Find Out More
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* <!-- About--> */}
        <section className="page-section bg-primary" id="about">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="text-white mt-0">We've got what you need!</h2>
                <hr className="divider light my-4" />
                <p className="text-white-50 mb-4">
                  We will ensure transparency at all times, honesty and respect
                  for the beneficiaries of our design, our partners and support.
                </p>
                <a
                  className="btn btn-light btn-xl js-scroll-trigger"
                  href="#services"
                >
                  Get Started!
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Services--> */}
        <section className="page-section" id="services">
          <div className="container">
            <h2 className="text-center mt-0">At Your Service</h2>
            <hr className="divider my-4" />
            <div className="row">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <FontAwesomeIcon icon={faUserCircle} color="#03A9F4" size="5x" />
                  <h3 className="h4 mb-2">Free Account</h3>
                  <p className="text-muted mb-0">
                    We offer you the information you need.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <FontAwesomeIcon
                    icon={faLaptopCode}
                    color="#03A9F4"
                    size="5x"
                  />
                  <h3 className="h4 mb-2">Up to Date</h3>
                  <p className="text-muted mb-0">
                    Every moment, at least one man needs blood.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <FontAwesomeIcon icon={faMapMarked} color="#03A9F4" size="5x" />
                  <h3 className="h4 mb-2">You can Donate Blood</h3>
                  <p className="text-muted mb-0">
                    Make an appointment at one of the partner centers and donate
                    blood.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <FontAwesomeIcon icon={faHeart} color="#03A9F4" size="5x" />
                  <h3 className="h4 mb-2">Made with Love</h3>
                  <p className="text-muted mb-0">
                    The project was based on your support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Feedbacks--> */}
        <section className="page-section" id="services">
          <div className="container">
            <h2 className="text-center mt-0">Top feedbacks</h2>
            <hr className="divider my-4" />

            <div className="row">
              {props.main.feedbacks &&
                props.main.feedbacks.map((feedback, index) => {
                  if (feedback.typeOfFeedback === "compliment")
                    return (
                      <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                          {feedback.rating === "5" && (
                            <>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                              <i className="far fa-star"></i>
                            </>
                          )}
                          {feedback.rating === "4" && (
                           <>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                         </>
                          )}
                           {feedback.rating === "3" && (
                           <>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>
                         </>
                          )}
                           {feedback.rating === "2" && (
                           <>
                           <i className="far fa-star"></i>
                           <i className="far fa-star"></i>

                         </>
                          )}
                           {feedback.rating === "1" && (
                           <>
                           <i className="far fa-star"></i>
                         </>
                          )}
                          <h3 className="h4 mb-2">
                            {feedback.typeOfFeedback.toUpperCase()}
                          </h3>
                          <p className="text-muted mb-0">
                            {feedback.description}
                          </p>
                        </div>
                      </div>
                    );
                  else return null;
                })}
            </div>
          </div>
        </section>

        <section className="page-section" id="contact">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="mt-0">Let's Get In Touch!</h2>
                <hr className="divider my-4" />
                <p className="text-muted mb-5">
                  This app is for Blood Donation Management.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                <FontAwesomeIcon icon={faPhone} size="3x" />
                <div>+1 (555) 123-4567</div>
              </div>
              <div className="col-lg-4 mr-auto text-center">
                <FontAwesomeIcon icon={faEnvelope} size="3x" />
                <a className="d-block" href="mailto:blood.donation.free@gmail.com">
                  blood.donation.free@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <Alert data={"Mesaj din home page"} />
      </>
    );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  main: state.main,
});

export default withRouter(connect(mapStateToProps, {})(HomePage));
