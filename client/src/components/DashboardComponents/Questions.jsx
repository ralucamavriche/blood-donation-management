import React, { Component } from "react";

import { getQuestions, updateQuestions } from "../../actions/mainActions";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getDonors, deleteDonor } from "../../actions/donorActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ConfirmModal from "./ConfirmModal";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenConfirm: false,
      questionConfirm: "",
      idQuestion: "",
      searchText: "",
      status: "",
      checkboxDenied: true,
      checkboxAccepted: true,
      checkboxPending: true,
    };
  }

  componentDidMount() {
    this.props.getQuestions();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleConfirm = () => {
    this.setState({ isOpenConfirm: !this.state.isOpenConfirm });
  };
  handleSendApp = () => {
    this.props.getQuestions();
  };

  handleStatus = async (idDonor, status) => {
    this.props.updateQuestions(idDonor, {status});
    await this.props.getQuestions();
  };
  handleAnswer = async (answer) => {
    if (answer === "cancel") {
      this.setState({
        isOpenConfirm: false,
        questionConfirm: "",
      });
    } else if (answer === "continue") {
      this.props.updateQuestions(this.state.idQuestion,{status: this.state.status});
      await this.props.getQuestions();
    }
  };

  handleResponseAnswer = async(event, id) => {
     await this.props.updateQuestions(id,{answer:event.currentTarget.textContent})
  }

  filterData = (author, email, status) => {
    if (
      this.state.searchText === "" ||
      author && author.includes(this.state.searchText) ||
      email && email.includes(this.state.searchText) ||
      status && status.includes(this.state.searchText)
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
                  <th scope="col">Author</th>
                  <th scope="col">Email</th>
                  <th scope="col">Question</th>
                  <th scope="col">Answer</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {this.props.main.questions &&
                  this.props.main.questions.map(
                    (
                      { _id, author, email, question, answer, status = "pending" },
                      index
                    ) => {
                      if (this.filterData(author, email, status) === true)
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{author}</td>
                            <td>{email}</td>
                            <td>{question}</td>
                            <td contentEditable={true} onInput={(e)=>{
                                this.handleResponseAnswer(e,_id)
                            }}>{answer}</td>
                            <td>{status.toUpperCase()}</td>
                            <td>
                              <button
                                title="Accepted"
                                onClick={() =>
                                  this.setState({
                                    isOpenConfirm: true,
                                    questionConfirm:
                                      "Are you sure you wanna accept this question?",
                                    idQuestion: _id,
                                    status: "Accepted",
                                  })
                                }
                                className="btn btn-success"
                              >
                                +
                              </button>
                              <button
                                title="Denied"
                                onClick={() =>
                                  this.setState({
                                    isOpenConfirm: true,
                                    questionConfirm:
                                      "Are you sure you wanna denie this question?",
                                    idQuestion: _id,
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
  main: state.main,
});

export default withRouter(
  connect(mapStateToProps, { getQuestions, updateQuestions })(Questions)
);
