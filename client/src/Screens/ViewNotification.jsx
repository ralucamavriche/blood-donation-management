import React, { Component } from "react";
import Navbar from "../components/Navbar";
import NotificationCardModel from "../components/shared/CardModel/NotificationCardModel";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

import { withRouter } from "react-router-dom";
import BreadcrumsModel from "./../components/shared/Breadcrum/BreadcrumsModel";
import Moment from "react-moment";
import CommentSection from "./../components/shared/CommentSection/CommentSection";
import { addComment, getRequests } from "../actions/requestActions";

class ViewNotification extends Component {
  componentDidMount() {
    this.props.getRequests();
  }
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
        {JSON.stringify}
        {this.props.request.requests &&
          this.props.request.requests.map((e, index) => {
            if (e._id === this.props.match.params.id)
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

                    <Container className="py-3">
                      <Row>
                        <Card style={{ width: "100%" }}>
                          <CardHeader>
                            <h4 class="mb-0">Add comment </h4>
                          </CardHeader>
                          <CardBody>
                            <Form onSubmit={this.onSubmit}>
                              <FormGroup>
                                <Label for="request">
                                  <h5 class="mb-0">{e.author}</h5>
                                </Label>
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
                                  color="dark"
                                  style={{ marginTop: "2rem" }}
                                  block
                                >
                                  Add a comment
                                </Button>
                              </FormGroup>
                            </Form>
                          </CardBody>
                        </Card>
                      </Row>
                    </Container>

                    <CommentSection comments={e.comments} />
                  </div>
                </>
              );
          })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { addComment, getRequests })(ViewNotification)
);
