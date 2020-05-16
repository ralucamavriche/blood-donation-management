import React, { Component, Fragment } from 'react';
import { Collapse, Nav, NavItem, NavbarToggler } from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Navbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired

  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <li className="nav-item">
            <span className="nav-link js-scroll-trigger" >{user ? `Welcom ${user.name}` : ''}</span>
          </li>
        </NavItem>
        <NavItem><Logout /></NavItem>
      </Fragment>
    );
    const guestLink = (
      <Fragment>
        <NavItem><RegisterModal /></NavItem>
        <NavItem><LoginModal /></NavItem>
      </Fragment>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-2" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
              Blood Donation
          </a>
            {/* <NavbarToggler className="navbar-toggler navbar-toggler-right" onClick={this.toggle}
              // type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </NavbarToggler> */}
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto my-2 my-lg-0">
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Services</a></li>
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <Nav className="ml-auto" navbar>
                      {isAuthenticated ? authLinks : guestLink}
                    </Nav>
                  </Nav>
                </Collapse>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Navbar);
