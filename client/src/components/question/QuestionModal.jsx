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

class QuestionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      email:"",
      question: ""
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
    if (this.state.author !== "" && this.state.question !== "") {
      const newQuestion = {
        author: this.state.author,
        email: this.state.email,
        question: this.state.question,
      };
      this.props.addQuestion(newQuestion)
    }

    this.props.handleClose(false);
  };
  render() {
    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Question</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <h4>Ask a question.</h4>
                <h6>Please contact us for specific reasons</h6>
                <Label for="author">Name</Label>
                <Input
                  required
                  input="text"
                  name="author"
                  id="author"
                  value={this.state.author}
                  placeholder="Add Your Name"
                  onChange={this.onChange}
                />
                <Label for="email">Email:</Label>
                <Input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  placeholder="Add email"
                  onChange={this.onChange}
                />
                <Label for="question">Question:</Label>
                <Input
                  required
                  type="text"
                  name="question"
                  id="question"
                  value={this.state.question}
                  placeholder="Add question"
                  onChange={this.onChange}
                />
                <Button
                  onClick={this.onSubmit}
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Submit
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

export default connect(mapStateToProps, {})(QuestionModal);
