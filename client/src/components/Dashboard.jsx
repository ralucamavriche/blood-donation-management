import React, { Component } from "react";
import Navbar from "../components/Navbar";
// import { Button, Grid, Row, Col, Alert } from "bootstrap";
import NotificationCardModel from "../components/shared/CardModel/NotificationCardModel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import classNames from 'classnames'
import {
  Button,
  Form,
  Alert,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

import { withRouter } from "react-router-dom";
import BreadcrumsModel from "./../components/shared/Breadcrum/BreadcrumsModel";
import Moment from "react-moment";
import CommentSection from "./../components/shared/CommentSection/CommentSection";
import { addComment, getRequests } from "../actions/requestActions";
import Sidebar from "./shared/Sidebar/Sidebar";
import Admin from "./Admin";
import Footer from "./Footer";

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen:true
    }
  }

  
  render() {
    return (
      <>
        <Navbar />
        <div class="container-fluid">
          <div class="row">
            <nav id="sidebar" className={classNames('navbar navbar-expand-lg navbar-light col-xs-2 col-sm-2 col-md-2 d-md-block sidebar custom-sidebar', { isHide: this.state.isOpen === false })}>
              <div class="sidebar-sticky">
                <h6 onClick={(e) => this.setState({isOpen:!this.state.isOpen})} class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <i class="fas fa-bars anchor"></i> <span>Dashboard</span>
                </h6>
                <ul class="nav flex-column">
                <li class="nav-item">
                        <Link class="nav-link active" to="/dashboard">
                        <i class="fab fa-mendeley"></i> <span className="title">Dashboard</span>
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link active" to="/dashboard/history">
                        <i class="fas fa-folder-minus"></i> <span className="title">History</span>
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link active" to="/dashboard/timetable">
                          <i class="fas fa-users"></i> <span className="title">Timetable</span>
                        </Link>
                      </li>
                 
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <i class="fas fa-question-circle"></i> <span>Help</span>
                  
                </h6>
                <ul class="nav flex-column mb-2">
                <li class="nav-item">
                        <a class="nav-link active" href="#">
                          <i class="fas fa-users"></i> <span className="title">Dashboard</span>
                        </a>
                      </li>
                </ul>
              </div>
            </nav>

            <main role="main" id="main" class="custom_main col-xs-2 col-sm-9 col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              {this.props.children}
            </main>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { addComment, getRequests })(Dashboard)
);
