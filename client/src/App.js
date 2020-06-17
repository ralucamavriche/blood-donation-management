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
import NotificationsPage from './Screens/NotificationsPage';
import ViewNotification from './Screens/ViewNotification';
import Dashboard from './components/Dashboard';
import MainDashboard from './components/DashboardComponents/MainDashboard';
import MedicalHistory from './components/DashboardComponents/MedicalHistory';
import MedicalFiles from './components/DashboardComponents/MedicalFiles';
import DonorsList from './components/donor/DonorListForHospital';
import History from './components/donor/History';
import Main from './components/Main';
import MyAppointments from './components/DashboardComponents/MyAppointments';
import { getFeedbacks } from './actions/mainActions';



class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getFeedbacks());

  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/donors' component={Donors} />
            <Route exact path="/donors/edit/:id" render={(props) => <EditDonor {...props} />} />
            <Route exact path="/request" component={BloodRequest} />
            <Route exact path='/notifications' component={NotificationsPage} />
            <Route exact path="/notifications/:id" component={ViewNotification}/>
            <Route exact path="/dashboard">
              <Dashboard>
                <MainDashboard/>
              </Dashboard>
            </Route>
            <Route exact path="/dashboard/timetable">
              <Dashboard>
                <MedicalHistory/>
              </Dashboard>
            </Route>
            <Route exact path="/dashboard/history">
              <Dashboard>
                {/* <MedicalFiles/> */}
                <History/>

              </Dashboard>
            </Route>
            <Route exact path="/dashboard/donors">
              <Dashboard>
                <Donors/>
              </Dashboard>
            </Route>
            <Route exact path="/dashboard/appointment">
              <Dashboard>
                <MyAppointments/>
              </Dashboard>
            </Route>
            <Route component={Main} />
            {/* TO DO add 404 page */}
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
