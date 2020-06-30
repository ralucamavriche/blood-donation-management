import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";

export default function ConfirmModal(props) {
  return (
    <>
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Confirm Modal</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="name">{props.question}</Label>

            <Button
              onClick={() => {
                props.toggle();
                return props.handleAnswer("continue");
              }}
              className="btn btn-default"
              color="outline-success"
              style={{ marginTop: "2rem" }}
              block
            >
              Continue
            </Button>

            <Button
              onClick={() => {
                props.toggle();
                return props.handleAnswer("cancel");
              }}
              className="btn btn-default"
              color="outline-danger"
              style={{ marginTop: "2rem" }}
              block
            >
              Cancel
            </Button>
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
}
