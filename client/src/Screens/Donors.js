import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style/_index.scss';
import { Container } from 'reactstrap';
import DonorsList from '../components/donor/DonorsList';
import DonorModal from '../components/donor/DonorModal';


class Donors extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    return (
      <Provider store={store}>
        <div className="Donors">
          <Navbar />
          <div className="donorsList">
          <DonorModal />
          <DonorsList />
          </div>
          <Footer />
        </div>
      </Provider>
    );
  }
}


export default Donors;
