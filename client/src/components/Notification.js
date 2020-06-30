import React, { Component } from "react";
import Moment from "react-moment";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRequests } from "../actions/requestActions";
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";
import { updateViewField } from "../actions/requestActions";
const checkNewStuff = (notifications, user_id) => {
  let res = 0;
  notifications &&
    notifications.map(({ viewedBy }) => {
      if (viewedBy.includes(user_id) === false) res++;
      return null;
    });

  return res;
};
class Notification extends Component {
  static propTypes = {
    getRequests: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      countOfNotificationsState: 0,
    };
  }

  componentDidMount() {
    this.props.getRequests();
  }

  handleClickNotifications = (e, _id, viewedBy) => {
    const user_id = this.props.auth.user._id;
    if (viewedBy.includes(user_id) === false) {
      let viewedByTemp = viewedBy;
      viewedByTemp.push(user_id);
      this.props.updateViewField(_id, viewedByTemp);
    }
    this.props.history.push(`/notifications/${_id}`);
  };
  render() {
    const { requests } = this.props.request;
    const { user } = this.props.auth;
    const countOfNotifications = user !== null ?checkNewStuff(requests, user._id) : 0;
    if(this.props.auth.user !==null)
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
          >
            <FontAwesomeIcon
              icon={faBell}
              size="1x"
              float="left"
              color="white"
            />
          </Link>

          {countOfNotifications > 0 && (
            <span className="badge badge-danger">{countOfNotifications}</span>
          )}

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
              {requests.map(
                ({ _id, title, date, viewedBy }, index) =>
                  viewedBy &&
                  viewedBy.includes(user._id) === false && (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <li
                        onClick={(e) =>
                          this.handleClickNotifications(e, _id, viewedBy)
                        }
                        className="custom_notfication_link"
                      >
                        <p>
                          <span className="custom_title">
                            {title}
                            {viewedBy &&
                              viewedBy.includes(user._id) === false && (
                                <span className="  badge badge-secondary custom_bagde">
                                  New
                                </span>
                              )}
                          </span>
                          <span className="timeline-icon">
                            <i className="far fa-bell"></i>
                          </span>
                          <span className="timeline-date">
                          <Moment fromNow>{date}</Moment>
                            </span>
                        </p>
                      </li>
                    </CSSTransition>
                  )
              )}
              {requests.length >= 3 && (
                <li
                  onClick={() => this.props.history.push(`/notifications`)}
                  className="custom_notfication_link"
                >
                  <p>
                    <span className="custom_title">
                      {" "}
                      View all {requests.length} notifications!
                    </span>
                    <span className="timeline-icon">
                      <i className="far fa-bell"></i>
                    </span>
                    <span className="timeline-date"></span>
                  </p>
                </li>
              )}
            </ul>
            <li role="none">
              <Link to="#" className="dropdown-menu-header"></Link>
            </li>
          </ul>
        </li>
      </>
    );
    else return null
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { getRequests, updateViewField })(Notification)
);
