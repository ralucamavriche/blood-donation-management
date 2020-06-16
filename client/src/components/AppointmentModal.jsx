import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { addAppointment } from "../actions/requestActions";

class AppointmentModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.name,
            email: this.props.email,
            date: ""
          };
    }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  onSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
        name: this.state.name,
        email: this.state.email,
        date: this.state.date,
        idDonor:this.props.auth.user._id
    };

    // //Add request via addRequest action
    this.props.addAppointment(newRequest);
    this.props.handleSendApp()
    // //Close modal
    this.props.toggle();
  };

  render() {
    return (
      <>
       
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.toggle}>Make an Appointment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={this.state.email}
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="exampleDate">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={this.state.date}
                    onChange={this.onChange}
                  placeholder="date placeholder"
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Send
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addAppointment })(AppointmentModal);
