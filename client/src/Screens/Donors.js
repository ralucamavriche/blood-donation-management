import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style/_donorsList.scss';
import DonorsList from '../components/donor/DonorsList';
import DonorModal from '../components/donor/DonorModal';
import DonorListForHospital from '../components/donor/DonorListForHospital';


class Donors extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    return (
      <Provider store={store}>
        <div className="Donors">
          <Navbar/>
          <div className="donorsList">
          <DonorModal />
          <DonorsList />
          {/* <DonorListForHospital /> */}
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}


export default Donors;
