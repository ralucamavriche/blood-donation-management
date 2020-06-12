import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Button, Grid, Row, Col, Alert } from "bootstrap";
import NotificationCardModel from "../components/shared/CardModel/NotificationCardModel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRequests } from "./../actions/requestActions";
import { CSSTransition } from "react-transition-group";
import { ListGroupItem } from "reactstrap";
import { withRouter } from "react-router-dom";
import BreadcrumsModel from './../components/shared/Breadcrum/BreadcrumsModel';
class NotificationsPage extends Component {
  render() {
    return (
      <>
        <Navbar />
        <BreadcrumsModel options={[{to:"/",name:"Blood D"}]} currentLink="Notifications" />
        <div className="container">
          <div className="row mt-4">
            <div className="col jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Fluid jumbotron</h1>
                <p className="lead">
                  This is a modified jumbotron that occupies the entire
                  horizontal space of its parent.
                </p>
              </div>
            </div>
          </div>

          {this.props.request.requests &&
            this.props.request.requests.map((e) => {
              return <NotificationCardModel request={e} />;
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
});

export default withRouter(connect(mapStateToProps, {})(NotificationsPage));
