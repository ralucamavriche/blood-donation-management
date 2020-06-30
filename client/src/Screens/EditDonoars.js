import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditDonor from "../components/donor/EditDonorModal";

class EditDonors extends Component {
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
