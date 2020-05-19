import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';
import Donors from './Screens/Donors';
import * as serviceWorker from './serviceWorker';
import EditDonor from './Screens/EditDonoars';
import BloodRequest from './components/BloodRequestModal';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/donors' component={Donors} />
        <Route exact path="/donors/edit/:id" render={(props) => <EditDonor {...props} />} />
        <Route exact path="/request"  component={BloodRequest} />
        <Route component={App} /> 
        {/* TO DO add 404 page */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
