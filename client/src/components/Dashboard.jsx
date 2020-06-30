import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { getRequests } from "../actions/requestActions";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { getDonors } from "./../actions/donorActions";
import PageOptions from "./shared/PageOptions/PageOptions";
import Alert from "./shared/Alert/Alert";
import { closeAlert } from "../actions/mainActions";
import Spinner from "./shared/Spinner";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }
  componentDidMount() {
    this.props.getDonors();
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    if (this.props.auth.isLoading === false)
      return (
        <>
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <nav
                id="sidebar"
                className={classNames(
                  "navbar navbar-expand-lg navbar-light col-xs-2 col-sm-2 col-md-2 d-md-block sidebar custom-sidebar",
                  { isHide: this.state.isOpen === false }
                )}
              >
                <div className="sidebar-sticky">
                  <h6
                    onClick={(e) =>
                      this.setState({ isOpen: !this.state.isOpen })
                    }
                    className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
                  >
                    <i className="fas fa-bars anchor"></i>
                  </h6>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link
                        className={classNames("nav-link", {
                          active: window.location.pathname === "/dashboard",
                        })}
                        to="/dashboard"
                      >
                        <i className="fab fa-mendeley"></i>{" "}
                        <span className="title">Dashboard</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={classNames("nav-link", {
                          active:
                            window.location.pathname ===
                            "/dashboard/appointment",
                        })}
                        to="/dashboard/appointment"
                      >
                        <i className="fas fa-folder-minus"></i>{" "}
                        <span className="title">My appointments</span>
                      </Link>
                    </li>
                    {this.props.auth.user &&
                      this.props.auth.user.role === "donor" && (
                        <li className="nav-item">
                          <Link
                            className={classNames("nav-link", {
                              active:
                                window.location.pathname ===
                                "/dashboard/timetable",
                            })}
                            to="/dashboard/timetable"
                          >
                            <i className="fas fa-users"></i>{" "}
                            <span className="title">Timetable</span>
                          </Link>
                        </li>
                      )}

                    {this.props.auth.user &&
                      this.props.auth.user.role === "admin" && (
                        <>
                          <li className="nav-item">
                            <Link
                              className={classNames("nav-link", {
                                active:
                                  window.location.pathname ===
                                  "/dashboard/questions",
                              })}
                              to="/dashboard/questions"
                            >
                              <i className="fas fa-folder-minus"></i>{" "}
                              <span className="title">Questions</span>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              className={classNames("nav-link", {
                                active:
                                  window.location.pathname ===
                                  "/dashboard/donors",
                              })}
                              to="/dashboard/donors"
                            >
                              <i className="fas fa-users"></i>{" "}
                              <span className="title">Donors Lists</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className={classNames("nav-link", {
                                active:
                                  window.location.pathname ===
                                  "/dashboard/feedback",
                              })}
                              to="/dashboard/feedback"
                            >
                              <i className="fas fa-users"></i>{" "}
                              <span className="title">Feedbacks</span>
                            </Link>
                          </li>
                        </>
                      )}
                  </ul>

                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <i className="fas fa-question-circle"></i>
                  </h6>
                </div>
              </nav>

              <main
                role="main"
                id="main"
                className="custom_main col-xs-2 col-sm-9 col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
              >
                {this.props.children}
              </main>
            </div>
          </div>
          <PageOptions />
          {this.props.main.isOpenAlert === true && (
            <Alert
              text={this.props.main.text}
              style={this.props.main.style}
              handleClose={this.props.closeAlert}
            />
          )}
          <Footer />
        </>
      );
    else return <Spinner />;
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth,
  main: state.main,
});

export default withRouter(
  connect(mapStateToProps, { getRequests, getDonors, closeAlert })(Dashboard)
);
