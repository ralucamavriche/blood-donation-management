import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style/_donorsList.scss';

import EditDonor from '../components/donor/EditDonorModal';


class EditDonors extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    return (
      <Provider store={store}>
        <div className="EditDonors">
          <Navbar/>
          <div className="donorsDetailes">
         <EditDonor/>
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}


export default EditDonors;
