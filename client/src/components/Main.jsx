import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';

class Main extends Component {
    constructor(props){
        super(props);
        this.state ={
            isLoadedState:this.props.auth.isLoading || null
        }
    }
  render() {
    return (
        <div className="App">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(Main));
