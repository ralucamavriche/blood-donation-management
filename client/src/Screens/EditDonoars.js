import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import EditDonor from "../components/donor/EditDonorModal";
import TimelineDonor from "../components/donor/TimelineDonor";
import History from "../components/donor/History";

class EditDonors extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    return (
      <div className="EditDonors">
        <Navbar />
        <div className="donorsDetailes">
          <EditDonor />
        </div>
       
        <Footer />
      </div>
    );
  }
}

export default EditDonors;
