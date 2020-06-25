import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import classNames from "classnames";
class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      typeOfFeedback: "",
      description: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  toggle = () => {
    this.props.handleClose(!this.props.isOpen);
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.rating !== "" &&
      this.state.typeOfFeedback !== "" &&
      this.state.description !== ""
    ) {
      const newRequest = {
        rating: this.state.rating,
        typeOfFeedback: this.state.typeOfFeedback,
        description: this.state.description,
      };
      this.props.addFeedback(newRequest);
    }

    this.props.handleClose(false);
  };
  render() {
    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
          <ModalHeader   >Feedback</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <h4>We would like your feedback to improve our website.</h4>
                <h6>What is your opinion of this page?</h6>
                <div className="customModalBody">
                  <button
                    className={classNames("btn", {
                      "btn-danger": this.state.rating === "1",
                    })}
                    onClick={() => this.setState({ rating: "1" })}
                  >
                    <i className="far fa-smile-wink"></i> {this.state.rating}
                  </button>
                  <button
                    className={classNames("btn", {
                      "btn-danger": this.state.rating === "2",
                    })}
                    onClick={() => this.setState({ rating: "2" })}
                  >
                    <i className="far fa-smile-wink"></i>
                  </button>
                  <button
                    className={classNames("btn", {
                      "btn-primary": this.state.rating === "3",
                    })}
                    onClick={() => this.setState({ rating: "3" })}
                  >
                    <i className="far fa-smile-wink"></i>
                  </button>
                  <button
                    className={classNames("btn", {
                      "btn-info": this.state.rating === "4",
                    })}
                    onClick={() => this.setState({ rating: "4" })}
                  >
                    <i className="far fa-smile-wink"></i>
                  </button>
                  <button
                    className={classNames("btn", {
                      "btn-success": this.state.rating === "5",
                    })}
                    onClick={() => this.setState({ rating: "5" })}
                  >
                    <i className="far fa-smile-wink"></i>
                  </button>
                </div>

                <hr />
                <h6>Please select your feedback category below.</h6>
                <div className="customModalBody">
                  <button
                    className={classNames("btn", {
                      "btn-primary": this.state.typeOfFeedback === "suggestion",
                    })}
                    onClick={() =>
                      this.setState({ typeOfFeedback: "suggestion" })
                    }
                  >
                    Suggestion
                  </button>
                  <button
                    className={classNames("btn", {
                      "btn-danger": this.state.typeOfFeedback === "bug",
                    })}
                    onClick={() => this.setState({ typeOfFeedback: "bug" })}
                  >
                    Bug
                  </button>
                  <button
                    className={classNames("btn", {
                      "btn-success": this.state.typeOfFeedback === "compliment",
                    })}
                    onClick={() =>
                      this.setState({ typeOfFeedback: "compliment" })
                    }
                  >
                    Compliment
                  </button>
                </div>

                <hr />

                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Please tell us something.
                  </label>
                  <textarea
               
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <Button
                  onClick={this.onSubmit}
                  color="success"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Send Feedback
                </Button>
                <Button
                  onClick={() => this.props.handleClose(false)}
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Cancel
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

export default connect(mapStateToProps, {})(FeedbackModal);
