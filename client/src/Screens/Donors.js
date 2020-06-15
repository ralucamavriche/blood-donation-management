import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assets/style/_donorsList.scss';
import DonorsList from '../components/donor/DonorsList';
import DonorModal from '../components/donor/DonorModal';

class Donors extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    return (
      
        <div className="Donors">
          {/* <Navbar/> */}
          <div className="donorsList">
          <DonorModal />
          <DonorsList />
          {/* <DonorListForHospital /> */}
          </div>
          {/* <Footer /> */}
        </div>
    );
  }
}


export default Donors;
