import React, { Component } from "react";
import Navbar from "../components/Navbar";
// import { Button, Grid, Row, Col, Alert } from "bootstrap";
import NotificationCardModel from "../components/shared/CardModel/NotificationCardModel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRequests } from "./../actions/requestActions";
import { CSSTransition } from "react-transition-group";
import {
  Button,
  Form,
  Alert,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

import { withRouter } from "react-router-dom";
import BreadcrumsModel from "./../components/shared/Breadcrum/BreadcrumsModel";
import Moment from "react-moment";
import CommentSection from "./../components/shared/CommentSection/CommentSection";
import { addComment } from "../actions/requestActions";
class ViewNotification extends Component {
  state = {
    comments: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    alert("d");
    e.preventDefault();
    const id_notification = this.props.match.params.id;
    alert(id_notification);
    this.props.request.requests &&
      this.props.request.requests.map((e, index) => {
        if (e._id === id_notification) {
          let comments = e.comments;
          const comment = {
            author: "Spital 5",
            author_id: "12313213",
            description: this.state.comments,
          };
          comments.push(comment);
          this.setState({
            comments: "",
          });
          this.props.addComment(id_notification, comments);
        }
      });
  };

  render() {

    return (
  
        <>
          {
            JSON.stringify
          }
          {this.props.request.requests &&
            this.props.request.requests.map((e, index) => {
              if(e._id === this.props.match.params.id) return (
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
                    <>
                      <div class="col jumbotron">
                        <h1 class="display-4">Notificare</h1>
                        <h3>{e.title}</h3>
                        <p class="lead">{e.description}</p>
                        <hr class="my-4"></hr>
                        <p>
                          <span className="author">{e.author}</span> requests{" "}
                          <span className="request">{e.blood_type} !</span>
                        </p>
                        <hr class="my-4"></hr>
                        <span>
                          {<Moment fromNow>{new Date(e.date)}</Moment>}
                        </span>
                      </div>
                    </>
                  
                  </div>

                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="request">Comments</Label>
                      <Input
                        required
                        input="text"
                        name="comments"
                        value={this.state.comments}
                        id="comments"
                        placeholder="Add comments"
                        onChange={this.onChange}
                      />
                      <Button
                        color="success"
                        style={{ marginTop: "2rem" }}
                        block
                      >
                        Add a comment
                      </Button>
                    </FormGroup>
                  </Form>

                  <CommentSection comments={e.comments} />
                </div>
              </>
              )
            }
            
        )}
        </>
      
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
});

export default withRouter(
  connect(mapStateToProps, { addComment })(ViewNotification)
);
