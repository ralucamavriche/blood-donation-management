import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRequests } from "./../actions/requestActions";
import { CSSTransition } from "react-transition-group";
import { ListGroupItem } from "reactstrap";

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
        <li class="nav-item dropdown">
          <Link
            class="nav-link "
            to="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
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
              <Link to="#" className="dropdown-menu-header">
                Notifications
              </Link>
            </li>

            {requests.map(({ _id, title, date }) => (
              <Link
                className="dropdown-item"
                // style={{padding:'2rem 1.5rem'}}
                // style={{ margin: "10px", width: "210px" }}
                key={_id}
                to="#"
              >
                <span class="timeline-icon">
                  <i class="fas fa-bell"></i>
                </span>
                {title}
                <span
                  className="timeline-date"
                  style={{ display: "flex", color: "black" }}
                >
                  {date}
                </span>
              </Link>
            ))}
            <li role="none">
              <Link to="#" className="dropdown-menu-header"></Link>
            </li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <Link
            class="nav-link "
            to="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
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
              <Link to="#" className="dropdown-menu-header">
                Notifications
              </Link>
            </li>
            <ul
              className="timeline timeline-icons timeline-sm"
              style={{ margin: "10px", width: "210px" }}
            >
              {requests.map(({ _id, title, date }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <li>
                    <p>
                      {title}
                      <span class="timeline-icon">
                        <i class="far fa-bell"></i>
                      </span>
                      <span className="timeline-date">{date}</span>
                    </p>
                  </li>
                </CSSTransition>
              ))}
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

export default connect(mapStateToProps, { getRequests })(Notification);
