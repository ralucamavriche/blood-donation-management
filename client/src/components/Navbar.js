import React, { Component, Fragment } from "react";
import { Collapse, Nav, NavItem, NavbarToggler } from "reactstrap";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import Notification from "./Notification";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import BloodRequest from "./BloodRequestModal";

import { Link } from "react-router-dom";
class Navbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <Notification />
        <li class="nav-item dropdown">
          <Link
            class="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {user
              ? `Welcome ${
                  user.name.charAt(0).toUpperCase() + user.name.slice(1)
                }`
              : ""}
          </Link>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link class="dropdown-item" to="#">
              <i class="fas fa-sliders-h"></i> Settings
            </Link>
            <Link class="dropdown-item" to="#">
              <i class="fas fa-user-circle"></i> Profiles
            </Link>
            <div class="dropdown-divider"></div>
            <Logout />
          </div>
        </li>
      </Fragment>
    );
    const guestLink = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top py-2"
          id="mainNav"
        >
          <div className="container">
            <Link className="navbar-brand js-scroll-trigger" to="#page-top">
              Blood Donation
            </Link>
            <NavbarToggler
              className="navbar-toggler navbar-toggler-right"
              onClick={this.toggle}
              // type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpen} className="somesome" navbar>
              <Nav className="ml-auto" navbar>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="#about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="#services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="#contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger">
                    <BloodRequest />
                  </Link>
                </li>
                {isAuthenticated ? authLinks : guestLink}
              </Nav>
            </Collapse>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Navbar);
