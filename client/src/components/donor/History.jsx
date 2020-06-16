import React, { Component } from "react";
import Navbar from "../Navbar";
// import NotificationCardModel from "../components/shared/CardModel/NotificationCardModel";
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

// Linke cu fisiere cu pdf
//Pach cu datele

class History extends Component {
  //   componentDidMount() {
  //     this.props.getRequests();
  //   }
  //   state = {
  //     comments: "",
  //   };
  //   onChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value });
  //   };

  //   onSubmit = (e) => {
  //     e.preventDefault();
  //     const id_notification = this.props.match.params.id;
  //     alert(id_notification);
  //     this.props.request.requests &&
  //       this.props.request.requests.map((e, index) => {
  //         if (e._id === id_notification) {
  //           let comments = e.comments;
  //           const comment = {
  //             author: "Spital 5",
  //             author_id: "12313213",
  //             description: this.state.comments,
  //           };
  //           comments.push(comment);
  //           this.setState({
  //             comments: "",
  //           });
  //           this.props.addComment(id_notification, comments);
  //         }
  //       });
  //   };

  render() {
    return (
      <>
          <Container className="py-3">
            <Row>
              <Card style={{ width: "100%" }}>
                <CardHeader>
                  <h4 class="mb-0">Add medical history:</h4>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="with a placeholder"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="password placeholder"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleText">Text Area</Label>
                      <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>

                    <Button>Submit</Button>
                  </Form>
                </CardBody>
              </Card>
            </Row>
          </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(History));
