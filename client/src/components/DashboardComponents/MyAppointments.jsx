import React, { Component } from "react";
import AppointmentModal from "../AppointmentModal";
import {
  getAppointment,
  updateAppointment,
} from "./../../actions/requestActions";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getDonors, deleteDonor } from "../../actions/donorActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ConfirmModal from "./ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class MyAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenConfirm: false,
      questionConfirm: "",
      idAppointment: "",
      searchText: "",
      status: "",
      checkboxDenied: true,
      checkboxAccepted: true,
      checkboxPending: true,
    };
  }

  componentDidMount() {
    this.props.getAppointment();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleConfirm = () => {
    this.setState({ isOpenConfirm: !this.state.isOpenConfirm });
  };
  handleSendApp = () => {
    this.props.getAppointment();
  };

  handleStatus = async (idDonor, status) => {
    this.props.updateAppointment(idDonor, status);
    await this.props.getAppointment();
  };
  handleAnswer = async (answer) => {
    if (answer === "cancel") {
      this.setState({
        isOpenConfirm: false,
        questionConfirm: "",
      });
    } else if (answer === "continue") {
      this.props.updateAppointment(this.state.idAppointment, this.state.status);
      await this.props.getAppointment();
    }
  };

  filterData = (name, email, status) => {
    if (
      this.state.searchText === "" ||
      name.includes(this.state.searchText) ||
      email.includes(this.state.searchText) ||
      status.includes(this.state.searchText)
    ) {
      if (
        status.toLowerCase() === "pending" &&
        this.state.checkboxPending === true
      )
        return true;
      if (
        status.toLowerCase() === "accepted" &&
        this.state.checkboxAccepted === true
      )
        return true;
      if (
        status.toLowerCase() === "denied" &&
        this.state.checkboxDenied === true
      )
        return true;
    }

    return false;
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        {user && user.role === "donor" && (
          <div className="row">
            <div className="col p-4">
              {/* <button class="btn icon-btn btn-success float-right btn-lg">
                <FontAwesomeIcon icon={faPlus} size="1x" />
                <span class="ml-1 img-circle text-success"></span>
                Add
              </button> */}
              {/* <Button
                className="appointment-btn float-right "
                color="info"
                size="sm"
                onClick={this.toggle}
              >
                Add appointment
              </Button> */}
            </div>
          </div>
        )}

        <ListGroup>
          <ListGroupItem active>
            My Appointments
            {user && user.role === "donor" && (
              <Button
                className="appointment-btn float-right "
                color="info"
                size="sm"
                onClick={this.toggle}
              >
                Add appointment
              </Button>
            )}
          </ListGroupItem>
          {user &&
            user.role === "donor" &&
            this.props.request.appointments &&
            this.props.request.appointments.map(({ name, date, idDonor }) => {
              if (user._id === idDonor)
                return (
                  <ListGroupItem>
                    <>
                      {name} - {date}
                    </>
                  </ListGroupItem>
                );
            })}
        </ListGroup>

        {user && user.role === "admin" && (
          <>
            <div class="input-group mb-3 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                value={this.state.searchText}
                onChange={(e) => this.setState({ searchText: e.target.value })}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3 mt-3">
              <div class="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  checked={this.state.checkboxPending}
                  onChange={() =>
                    this.setState({
                      checkboxPending: !this.state.checkboxPending,
                    })
                  }
                  id="checkboxPending"
                />
                <label class="custom-control-label" for="checkboxPending">
                  Pending
                </label>
              </div>

              <div class="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  checked={this.state.checkboxAccepted}
                  onChange={() =>
                    this.setState({
                      checkboxAccepted: !this.state.checkboxAccepted,
                    })
                  }
                  id="checkboxAccepted"
                />
                <label class="custom-control-label" for="checkboxAccepted">
                  Accepted
                </label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  checked={this.state.checkboxDenied}
                  onChange={() =>
                    this.setState({
                      checkboxDenied: !this.state.checkboxDenied,
                    })
                  }
                  id="checkboxDenied"
                />
                <label class="custom-control-label" for="checkboxDenied">
                  Denied
                </label>
              </div>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.request.appointments &&
                  this.props.request.appointments.map(
                    (
                      { _id, name, email, date, status = "pending", idDonor },
                      index
                    ) => {
                      if (this.filterData(name, email, status) === true)
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{date}</td>
                            <td>{status.toUpperCase()}</td>
                            <td>
                              <button
                                title="Accepted"
                                // onClick={(e) => this.handleStatus(_id, "Accepted")}
                                onClick={() =>
                                  this.setState({
                                    isOpenConfirm: true,
                                    questionConfirm:
                                      "Are you sure you wanna accept this appointment?",
                                    idAppointment: _id,
                                    status: "Accepted",
                                  })
                                }
                                className="btn btn-success"
                              >
                                +
                              </button>
                              <button
                                title="Denied"
                                // onClick={(e) => this.handleStatus(_id, "Denied")}
                                onClick={() =>
                                  this.setState({
                                    isOpenConfirm: true,
                                    questionConfirm:
                                      "Are you sure you wanna denie this appointment?",
                                    idAppointment: _id,
                                    status: "Denied",
                                  })
                                }
                                className="btn btn-danger"
                              >
                                -
                              </button>
                            </td>
                          </tr>
                        );
                    }
                  )}
              </tbody>
            </table>
          </>
        )}

        {user && user.role === "donor" && (
          <AppointmentModal
            name={user.name}
            email={user.email}
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            handleSendApp={this.handleSendApp}
          />
        )}
        <ConfirmModal
          isOpen={this.state.isOpenConfirm}
          toggle={this.toggleConfirm}
          question={this.state.questionConfirm}
          handleAnswer={this.handleAnswer}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  donor: state.donor,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  request: state.request,
});

export default withRouter(
  connect(mapStateToProps, { getAppointment, updateAppointment })(
    MyAppointments
  )
);
