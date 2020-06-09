import React, { Component, Fragment } from 'react';
import { Collapse, Nav, NavItem, NavbarToggler } from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BloodRequest from './BloodRequestModal';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faFilePdf } from '@fortawesome/free-solid-svg-icons';

import '../assets/style/_ringBell.scss';
// import 'bootstrap.min.js';


class Navbar extends Component {
  state = {
    isOpen: false,
    isOpenNotification: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired

  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onClickNotification = () => {
    return this.state.isOpenNotification;
    // this.setState({
    //   isOpenNotification: !this.state.isOpenNotification
    // });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="nav-link js-scroll-trigger" >{user ? `Welcom ${user.name}` : ''}</span>
        </NavItem>
        <NavItem><Logout /></NavItem>
      </Fragment>
    );
    const guestLink = (
      <Fragment>
        <NavItem><RegisterModal /></NavItem>
        <NavItem><LoginModal /></NavItem>
        <NavItem><BloodRequest /></NavItem>
      </Fragment>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-2" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
              Blood Donation
          </a>
            <NavbarToggler className="navbar-toggler navbar-toggler-right" onClick={this.toggle}
              // type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpen} className="somesome" navbar>
              <Nav className="ml-auto" navbar>
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Services</a></li>
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                {isAuthenticated ? authLinks : guestLink}

              </Nav>
            </Collapse>

            {/* Ring Bell Notification */}

            
            {/* <div className="dropdown" style={{ float: 'right', padding: '13px' }} >
              <a href="#" onClickNotification={this.state.isOpenNotification} role="button" data-toggle="dropdown" id="dropdownMenu1" data-target="#" style={{ float: 'left' }} aria-expanded="true">
                <FontAwesomeIcon icon={faBell} size="1x" float="left" color="white" />
              </a>
              <span className="badge badge-danger">6</span>
              <ul role="menu" className="dropdown-menu dropdown-menu-left pull-right"  aria-labelledby="dropdownMenu1">
                <li role="none">
                  <a href="#" className="dropdown-menu-header">Notifications</a>
                </li>
                <ul className="timeline timeline-icons timeline-sm" style={{ margin: '10px', width: '210px' }}>
                  <li>
                    <p>
                      First Notification
                      <span className="timeline-date">Dec 10, 22:00</span>
                    </p>
                  </li>
                </ul>
                <li role="none">
                  <a href="#" className="dropdown-menu-header"></a>
                </li>
              </ul>
            </div> */}

            {/* <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto my-2 my-lg-0">
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Services</a></li>
                <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                <Collapse isOpen={false} className="somesome" navbar>
                  <Nav className="ml-auto" navbar>
                    <Nav className="ml-auto" navbar>
                      {isAuthenticated ? authLinks : guestLink}
                    </Nav>
                  </Nav>
                </Collapse>
              </ul>
            </div> */}
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
