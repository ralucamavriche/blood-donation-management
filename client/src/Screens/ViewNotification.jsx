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
import BreadcrumsModel from "./../components/shared/Breadcrum/BreadcrumsModel";
import Moment from 'react-moment';
import CommentSection from './../components/shared/CommentSection/CommentSection';
class ViewNotification extends Component {
  render() {
    return (
      <>
        <Navbar />
        <BreadcrumsModel
          options={[
            { to: "/", name: "Blood D" },
            { to: "/notifications", name: "Notifications" },
          ]}
          currentLink="Donare Sange"
        />
        <div className="container">
          <div className="row mt-4">
            {this.props.request.requests &&
              this.props.request.requests.map((e, index) => {
                if (e._id === window.location.pathname.split("/")[2])
                  return (
                    <>
                      <div class="col jumbotron">
                        <h1 class="display-4">Notificare</h1>
                        <h3>{e.title}</h3>
                        <p class="lead">{e.description}</p>
                        <hr class="my-4"></hr>
                        <p>
                          <span className="author">{e.author}</span>{" "}
                          requests{" "}
                          <span className="request">{e.blood_type} !</span>
                        </p>
                        <hr class="my-4"></hr>
                  <span>{<Moment fromNow>{new Date(e.date)}</Moment>}</span>
                      </div>
                     
                    </>
                  );
              })}
          </div>
          <CommentSection/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
});

export default withRouter(connect(mapStateToProps, {})(ViewNotification));
