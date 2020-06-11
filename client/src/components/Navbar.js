import React, { Component, Fragment } from 'react';
import { Collapse, Nav, NavItem, NavbarToggler } from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BloodRequest from './BloodRequestModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
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
        <li class="nav-item dropdown">
          <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user ? `Welcome ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}` : ''}
          </Link>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link class="dropdown-item" to="#"><i class="fas fa-sliders-h"></i> Settings</Link>
            <Link class="dropdown-item" to="#"><i class="fas fa-user-circle"></i> Profiles</Link>
            <div class="dropdown-divider"></div>
            <Logout/>
          </div>
        </li>
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
            <Link className="navbar-brand js-scroll-trigger" to="#page-top">
              Blood Donation
          </Link>
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
                <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="#about">About</Link></li>
                <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="#services">Services</Link></li>
                <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="#contact">Contact</Link></li>
                <li class="nav-item dropdown" >
                  <Link class="nav-link " to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FontAwesomeIcon icon={faBell} size="1x" float="left" color="white" />
                  </Link>
                  <span className="badge badge-danger">6</span>

                  <ul role="menu" className="dropdown-menu dropdown-menu-left pull-right" aria-labelledby="navbarDropdown">
                    <li role="none">
                      <Link to="#" className="dropdown-menu-header">Notifications</Link>
                    </li>
                    <ul className="timeline timeline-icons timeline-sm" style={{ margin: '10px', width: '210px' }}>
                      <li>
                        <p>
                          First Notification
                            <span class="timeline-icon"><i class="far fa-file-pdf"></i></span>
                          <span className="timeline-date">Dec 10, 22:00</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          First Notification
                            <span className="timeline-date">Dec 10, 22:00</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          First Notification
                            <span className="timeline-date">Dec 10, 22:00</span>
                        </p>
                      </li>
                    </ul>
                    <li role="none">
                      <Link to="#" className="dropdown-menu-header"></Link>
                    </li>
                  </ul>
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Navbar);
