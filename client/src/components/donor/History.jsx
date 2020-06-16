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
        date: '',
        url:'',
        specifications: ''
    }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newHistory = {
        date: this.state.date,
        url: this.state.url,
        specifications: this.state.specifications
    }
    console.log(this.props)

    // this.props.addHistory(newHistory);


}

  render() {
    return (
      <>
         {/* <BreadcrumsModel
                    options={[
                      { to: "/", name: "Blood D" },
                    ]}
                    currentLink="Add medical history"
                  /> */}
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
                      value={this.state.name}
                    //   onChange={this.onChange}
                      placeholder="date placeholder"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleUrl">Uploading medical file</Label>
                    <Input
                      type="url"
                      name="url"
                      id="url"
                      placeholder="url placeholder"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleText">Other specifications</Label>
                    <Input type="textarea" name="text" id="specifications" />
                  </FormGroup>

                  <Button color="dark" style={{ marginTop: "2rem" }} block>
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
