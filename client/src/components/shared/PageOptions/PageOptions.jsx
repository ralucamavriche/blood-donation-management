import React, { Component, useState } from "react";
import FeedbackModal from "./../../feedback/FeedbackModal";
import {addFeedback} from '../../../actions/mainActions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

 function PageOptions(props) {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <>
        <div className="pageOptions">
          <div class="btn-group dropleft">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle btn-circle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div
              className="dropdown-menu customDropLeft"
              x-placement="left-start"
            >
              <a class="dropdown-item" href="#" onClick={() => setIsOpen(true)}
              >
                Add feedback
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                FAQ
              </a>
            </div>
          </div>
        </div>
        <FeedbackModal isOpen={isOpen} handleClose={setIsOpen} addFeedback={props.addFeedback}/>
      </>
  )
}

const mapStateToProps = state => ({
 
});

export default withRouter(connect(
  mapStateToProps,
  { addFeedback }
)(PageOptions));