import React, { Component } from "react";
import AppointmentModal from "../AppointmentModal";
import {
  getAppointment,
  updateAppointment,
} from "./../../actions/requestActions";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import Moment from "react-moment";
import BreadcrumsModel from './../shared/Breadcrum/BreadcrumsModel';

class MyAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenConfirm: false,
      questionConfirm: "",
      idAppointment: "",
      nameOfDonor: '',
      emailOfDonor: '',
      dateOfDonor: "",
      searchText: "",
      status: "",
      checkboxDenied: true,
      checkboxAccepted: true,
      checkboxPending: true,
      showAddBtn:false
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
      this.props.updateAppointment(this.state.idAppointment, this.state.status, this.state.nameOfDonor, this.state.emailOfDonor, '', this.props.auth.user.name.toUpperCase(), this.state.dateOfDonor.toString());
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

  handleAppointmentsView = async (appointments,id) => {
    let ok = true
    // eslint-disable-next-line
    await appointments.map(({ name, date, idDonor, status }) => {
      if (id === idDonor) {
        if (status === 'pending' || status === 'Accepted') {
          ok = false
        }
      }
    })
    if(this.state.showAddBtn !== ok)
    this.setState({
      showAddBtn:ok
    })
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
         <BreadcrumsModel
                options={[{ to: "/", name: "Blood Donation" }]}
                currentLink="Appointments"
            />
        {user && user.role === "donor" && (
          <div className="row">
            <div className="col p-4">
          
            </div>
          </div>
        )}

        <ListGroup>
          <ListGroupItem active>
            My Appointments
            {user && user.role === "donor" && this.handleAppointmentsView(this.props.request.appointments,user._id) && this.state.showAddBtn === true && (
              <Button
                className="appointment-btn float-right "
                color="warning"
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
            this.props.request.appointments.map(({ name, date, idDonor, status }) => {
              if (user._id === idDonor)
                return (
                  <ListGroupItem>
                    <>
                      {name} - <Moment format="DD/MM/YYYY">{date}</Moment> | Status : {status}
                    </>
                  </ListGroupItem>
                );
                return null;
            })}
        </ListGroup>

        {user && user.role === "admin" && (
          <>
            <div className="input-group mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={this.state.searchText}
                onChange={(e) => this.setState({ searchText: e.target.value })}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3 mt-3">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  checked={this.state.checkboxPending}
                  onChange={() =>
                    this.setState({
                      checkboxPending: !this.state.checkboxPending,
                    })
                  }
                  id="checkboxPending"
                />
                <label className="custom-control-label" htmlFor="checkboxPending">
                  Pending
                </label>
              </div>

              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  checked={this.state.checkboxAccepted}
                  onChange={() =>
                    this.setState({
                      checkboxAccepted: !this.state.checkboxAccepted,
                    })
                  }
                  id="checkboxAccepted"
                />
                <label className="custom-control-label" htmlFor="checkboxAccepted">
                  Accepted
                </label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  checked={this.state.checkboxDenied}
                  onChange={() =>
                    this.setState({
                      checkboxDenied: !this.state.checkboxDenied,
                    })
                  }
                  id="checkboxDenied"
                />
                <label className="custom-control-label" htmlFor="checkboxDenied">
                  Denied
                </label>
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th className="text-center" scope="col">
                    Actions
                  </th>
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
                            <td>
                              {" "}
                              <Moment format="DD/MM/YYYY">{date}</Moment>
                            </td>
                            <td>{status.toUpperCase()}</td>
                            <td className="text-center">
                              <button
                                title="Accepted"
                                onClick={() =>
                                  this.setState({
                                    isOpenConfirm: true,
                                    questionConfirm:
                                      "Are you sure you wanna accept this appointment?",
                                    idAppointment: _id,
                                    status: "Accepted",
                                    nameOfDonor: name,
                                    emailOfDonor: email,
                                    dateOfDonor: date,
                                  })
                                }
                                className="btn btn-success mx-2"
                              >
                                Accepted
                              </button>
                              <button
                                title="Denied"
                                onClick={() =>
                                  this.setState({
                                    isOpenConfirm: true,
                                    questionConfirm:
                                      "Are you sure you wanna denie this appointment?",
                                    idAppointment: _id,
                                    status: "Denied",
                                    nameOfDonor: name,
                                    emailOfDonor: email,
                                    dateOfDonor: date,
                                  })
                                }
                                className="btn btn-danger"
                              >
                                Denied
                              </button>
                            </td>
                          </tr>
                        );
                        return null;
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
