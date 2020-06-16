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
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { withRouter } from "react-router-dom";

export default function ConfirmModal(props) {
  return (
    <>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Confirm Modal</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">{props.question}</Label>

            <Button
              onClick={() => {props.toggle() ;return props.handleAnswer("cancel")}}
              className="btn btn-default"
              style={{ marginTop: "2rem" }}
              block
            >
              Cancel
            </Button>
            <Button
              onClick={() => {props.toggle() ;return props.handleAnswer("continue")}}
              className="btn btn-primary"
              style={{ marginTop: "2rem" }}
              block
            >
              Continue
            </Button>
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
}
