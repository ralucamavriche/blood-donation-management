import React, { useState } from "react";
import FeedbackModal from "./../../feedback/FeedbackModal";
import { addFeedback, addQuestion } from "../../../actions/mainActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QuestionModal from "./../../question/QuestionModal";

function PageOptions(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenQuestion, setIsOpenQustion] = useState(false);
  return (
    <>
      <div className="pageOptions">
        <div class="btn-group dropleft">
          <button
            type="button"
            className="btn btn-info dropdown-toggle btn-lg btn-circle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div
            className="dropdown-menu customDropLeft"
            x-placement="left-start"
          >
            {/* eslint-disable-next-line */}
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setIsOpen(true)}
            >
              Add feedback
            </a>
            <div className="dropdown-divider"></div>
            {/* eslint-disable-next-line */}
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setIsOpenQustion(true)}
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
      <FeedbackModal
        isOpen={isOpen}
        handleClose={setIsOpen}
        addFeedback={props.addFeedback}
      />
      <QuestionModal
        isOpen={isOpenQuestion}
        handleClose={setIsOpenQustion}
        addQuestion={props.addQuestion}
      />
    </>
  );
}

const mapStateToProps = (state) => ({});

export default withRouter(
  connect(mapStateToProps, { addFeedback, addQuestion })(PageOptions)
);
