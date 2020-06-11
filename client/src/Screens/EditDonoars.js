import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assets/style/_donorsList.scss';

import EditDonor from '../components/donor/EditDonorModal';


class EditDonors extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    return (
     
        <div className="EditDonors">
          <Navbar/>
          <div className="donorsDetailes">
         <EditDonor/>
          </div>
          <Footer />
        </div>
    );
  }
}


export default EditDonors;
