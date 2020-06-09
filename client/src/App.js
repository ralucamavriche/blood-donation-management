import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Donors from './Screens/Donors';
import EditDonor from './Screens/EditDonoars';
import BloodRequest from './components/BloodRequestModal';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/_index.scss';


const AppDefault = () => {
  return (<div className="App">
    <Navbar />
    <HomePage />
    <Footer />
  </div>)
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={AppDefault} />
            <Route exact path='/donors' component={Donors} />
            <Route exact path="/donors/edit/:id" render={(props) => <EditDonor {...props} />} />
            <Route exact path="/request" component={BloodRequest} />
            <Route component={AppDefault} />
            {/* TO DO add 404 page */}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
