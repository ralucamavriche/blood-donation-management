import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRequests } from "./../actions/requestActions";
import { CSSTransition } from "react-transition-group";
import { ListGroupItem } from "reactstrap";
import {withRouter} from 'react-router-dom'

class Notification extends Component {
  static propTypes = {
    getRequests: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getRequests();
  }

  render() {
    const { requests } = this.props.request;
    const countOfNotifications = requests.length;
    return (
      <>
          <li className="nav-item dropdown">
          <Link
            className="nav-link"
            to="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="false"
            aria-expanded="false"
          >Notifications 
            <FontAwesomeIcon
              icon={faBell}
              size="1x"
              float="left"
              color="white"
            />
            
          </Link>
          <span className="badge badge-danger">{countOfNotifications}</span>
          <ul
            role="menu"
            className="dropdown-menu dropdown-menu-left pull-right"
            aria-labelledby="navbarDropdown"
          >
            <li role="none">
              <Link to="/notifications" className="dropdown-menu-header">
                Notifications
              </Link>
            </li>
            <ul
              className="timeline timeline-icons timeline-sm"
              style={{ margin: "10px", width: "210px" }}
            >
              {requests.map(({ _id, title, date },index) => (
               index < 3 && <CSSTransition key={_id} timeout={500} classNames="fade">
                  <li onClick={() => this.props.history.push(`/notifications/${_id}`)} className="custom_notfication_link">
                    <p>
                    <span className="custom_title">{title}</span>
                      <span className="timeline-icon">
                        <i className="far fa-bell"></i>
                      </span>
                      <span className="timeline-date">{date}</span>
                    </p>
                  </li>
                </CSSTransition>
              ))}
              {
                requests.length >=3 &&(
                  <li onClick={() => this.props.history.push(`/notifications`)} className="custom_notfication_link">
                    
                    <p>
                    <span className="custom_title"> View all {requests.length} notifications!</span>
                      <span className="timeline-icon">
                        <i className="far fa-bell"></i>
                      </span>
                      <span className="timeline-date"></span>
                    </p>
                  </li>
                )
              }
            </ul>
            <li role="none">
              <Link to="#" className="dropdown-menu-header"></Link>
            </li>
          </ul>
        </li>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
});

export default withRouter(connect(mapStateToProps, { getRequests })(Notification));
