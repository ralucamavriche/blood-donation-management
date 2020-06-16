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
import BreadcrumsModel from "../shared/Breadcrum/BreadcrumsModel";

class History extends Component {
  state = {
    date: "",
    url: "",
    specifications: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newHistory = {
      date: this.state.date,
      url: this.state.url,
      specifications: this.state.specifications,
    };

    this.props.handleSubmitHistory(newHistory);
    this.setState({
      date: "",
      url: "",
      specifications: "",
    });
  };

  render() {
    return (
      <>
        <Container className="py-5">
          <Row>
            <Card style={{ width: "100%" }}>
              <CardHeader>
                <h4 class="mb-0">Add medical history:</h4>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="exampleDate">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="date"
                      value={this.state.date}
                      onChange={this.onChange}
                      placeholder="date placeholder"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleUrl">Uploading medical file</Label>
                    <Input
                      type="url"
                      name="url"
                      value={this.state.url}
                      onChange={this.onChange}
                      id="url"
                      placeholder="url placeholder"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleText">Other specifications</Label>
                    <Input
                      value={this.state.specifications}
                      onChange={this.onChange}
                      type="textarea"
                      name="specifications"
                      id="specifications"
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    block
                  >
                    Submit
                  </Button>
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
