import React, { Component } from 'react';
import DonorsList from '../components/donor/DonorsList';

class Donors extends Component {
  render() {
    return (

      <div className="Donors">
        <div className="donorsList">
          <DonorsList />
        </div>
      </div>
    );
  }
}


export default Donors;
