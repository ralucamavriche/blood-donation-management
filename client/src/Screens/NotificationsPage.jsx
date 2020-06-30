import React, { Component } from "react";
import Navbar from "../components/Navbar";
// eslint-disable-next-line
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
        <section
          className="my-5 page-section-notification bg-primary shadow-lg "
          id="about"
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="text-white mt-0"> View all notifications</h2>
                <hr className="divider light my-4" />
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          {this.props.request.requests &&
            this.props.request.requests.map((e) => {
              return <NotificationCardModel data={e} />;
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
