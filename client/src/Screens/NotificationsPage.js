import React, { Component } from "react";
import Navbar from "./../components/Navbar";

import { Grid, Row, Col, Alert } from "bootstrap";

class NotificationsPage extends Component {
  render() {
    return (
      <>
        <Navbar />
          <div className="container">
              <div className="header">
                <h4 className="title">Notifications</h4>
                <p className="category">
                  Ceva
                </p>
              </div>
              <div className="content"></div>
            </div>
      </>
    );
  }
}

export default NotificationsPage;
