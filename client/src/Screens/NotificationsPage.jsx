import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Button } from "bootstrap";
import NotificationCardModel from "../components/shared/CardModel/NotificationCardModel";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BreadcrumsModel from "./../components/shared/Breadcrum/BreadcrumsModel";
class NotificationsPage extends Component {
  render() {
    return (
      <>
        <Navbar />
        <BreadcrumsModel
          options={[{ to: "/", name: "Blood D" }]}
          currentLink="Notifications"
        />
        <div className="container">
          <div className="row mt-4">
            <div className="col jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Fluid jumbotron</h1>
                <p className="lead">
                  Ceva util horizontal space of its parent.
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
