import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { getRequests } from "../actions/requestActions";
import Footer from "./Footer";
import PropTypes from "prop-types";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    // const { isAuthenticated, user } = this.props.auth;
    if (this.props.auth.isLoading === false)
      return (
        <>
          <Navbar />
          <div class="container-fluid">
            <div class="row">
              <nav
                id="sidebar"
                className={classNames(
                  "navbar navbar-expand-lg navbar-light col-xs-2 col-sm-2 col-md-2 d-md-block sidebar custom-sidebar",
                  { isHide: this.state.isOpen === false }
                )}
              >
                <div class="sidebar-sticky">
                  <h6
                    onClick={(e) =>
                      this.setState({ isOpen: !this.state.isOpen })
                    }
                    class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
                  >
                    <i class="fas fa-bars anchor"></i>
                  </h6>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <Link
                        className={classNames("nav-link", {
                          active: window.location.pathname === "/dashboard",
                        })}
                        to="/dashboard"
                      >
                        <i class="fab fa-mendeley"></i>{" "}
                        <span className="title">Dashboard</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        className={classNames("nav-link", {
                          active:
                            window.location.pathname === "/dashboard/history",
                        })}
                        to="/dashboard/history"
                      >
                        <i class="fas fa-folder-minus"></i>{" "}
                        <span className="title">History</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        className={classNames("nav-link", {
                          active:
                            window.location.pathname === "/dashboard/appointment",
                        })}
                        to="/dashboard/appointment"
                      >
                        <i class="fas fa-folder-minus"></i>{" "}
                        <span className="title">My appointments</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        className={classNames("nav-link", {
                          active:
                            window.location.pathname === "/dashboard/timetable",
                        })}
                        to="/dashboard/timetable"
                      >
                        <i class="fas fa-users"></i>{" "}
                        <span className="title">Timetable</span>
                      </Link>
                    </li>


                    
                    {this.props.auth.user &&
                      this.props.auth.user.role === "admin" && (
                        <li class="nav-item">
                          <Link
                            className={classNames("nav-link", {
                              active:
                                window.location.pathname ===
                                "/dashboard/donors",
                            })}
                            to="/dashboard/donors"
                          >
                            <i class="fas fa-users"></i>{" "}
                            <span className="title">Donors Lists</span>
                          </Link>
                        </li>
                      )}
                  </ul>

                  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <i class="fas fa-question-circle"></i>
                  </h6>
                </div>
              </nav>

              <main
                role="main"
                id="main"
                class="custom_main col-xs-2 col-sm-9 col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
              >
                {this.props.children}
              </main>
            </div>
          </div>
          <Footer />
        </>
      );
    else
      return (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { getRequests })(Dashboard));
