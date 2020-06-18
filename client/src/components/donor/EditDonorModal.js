import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getDonors,
  getCurrentDonorById,
  updateDonorInfo,
  changeCurrentDonorInfo,
} from "../../actions/donorActions";
import History from "./History";
import TimelineDonor from "./TimelineDonor";
import Alert from './../shared/Alert/Alert';

import {
  Button,
  Form,
  // Alert,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

class EditDonor extends Component {
  constructor(props) {
    super(props);

    this.routeChange = this.routeChange.bind(this);

    this.state = {
      modal: false,
      firstTime: true,
      name: "",
      email: "",
      age: "",
      weight: "",
      phone_number: "",
    };
  }

  async componentDidMount() {
    await this.props.getCurrentDonorById(this.props.match.params.id);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateDonorInfo(
      this.props.match.params.id,
      this.props.donor.currentDonor
    );
  };

  handleSubmitHistory = (data) => {
    let currentHistory = this.props.donor.currentDonor.history || [];
    currentHistory.push(data);
    this.props.updateDonorInfo(this.props.match.params.id, {
      history: currentHistory,
    });
  };

  handleInputChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    let payload = {
      name,
      value,
    };
    this.props.changeCurrentDonorInfo(payload);
  };
  routeChange() {
    let path = `/dashboard/donors`;
    this.props.history.push(path);
  }

  render() {
    const { isSuccessUpdate } = this.props.donor.currentDonor;
    return (
      <>
        <div>
          {/* <Alert color="info" className="text-center" isOpen={isSuccessUpdate}>
            Donor information has been updated!
          </Alert> */}
          <Container style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Button outline color="secondary" onClick={this.routeChange}>
              Back
            </Button>
            <h3 style={{ marginTop: "30px" }}>Edit Donors Log</h3>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="donor">Donor</Label>
                <Input
                  required
                  input="text"
                  name="name"
                  id="donor"
                  value={
                    (this.props.donor.currentDonor &&
                      this.props.donor.currentDonor.name) ||
                    ""
                  }
                  placeholder="Add Name donor"
                  onChange={this.handleInputChange}
                />
                <Label for="email">Email</Label>
                <Input
                  required
                  input="email"
                  name="email"
                  id="email"
                  value={this.props.donor.currentDonor.email || ""}
                  placeholder="Add Email"
                  onChange={this.handleInputChange}
                />
                <Label for="age">Age</Label>
                <Input
                  required
                  input="text"
                  name="age"
                  id="age"
                  value={this.props.donor.currentDonor.age || ""}
                  placeholder="Add Age"
                  onChange={this.handleInputChange}
                />
                <Label for="weight">Weight</Label>
                <Input
                  required
                  input="text"
                  name="weight"
                  id="weight"
                  value={this.props.donor.currentDonor.weight || ""}
                  placeholder="Add weight"
                  onChange={this.handleInputChange}
                />
                <Label for="phone_number">Phone number</Label>
                <Input
                  required
                  input="text"
                  name="phone_number"
                  id="phone_number"
                  value={this.props.donor.currentDonor.phone_number || ""}
                  placeholder="Add Phone Number"
                  onChange={this.handleInputChange}
                />
                <Button color="success" style={{ marginTop: "2rem" }} block>
                  Update donor
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </div>
        <div className="container">
          {this.props.donor.currentDonor && (
            <History handleSubmitHistory={this.handleSubmitHistory} />
          )}
          {this.props.donor.currentDonor && (
            <TimelineDonor
              historyData={this.props.donor.currentDonor.history}
            />
          )}
        </div>
        {
            this.props.main.isOpenAlert === true && (
              <Alert text={this.props.main.text} style={this.props.main.style} handleClose={this.props.closeAlert}/>  
            )
          }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  donor: state.donor,
  main:state.main
});

export default withRouter(
  connect(mapStateToProps, {
    getDonors,
    getCurrentDonorById,
    updateDonorInfo,
    changeCurrentDonorInfo,
  })(EditDonor)
);
