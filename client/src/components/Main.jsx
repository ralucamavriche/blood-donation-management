import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import Alert from './shared/Alert/Alert';

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
      {
            this.props.main.isOpenAlert === true && (
              <Alert text={this.props.main.text} style={this.props.main.style} handleClose={this.props.closeAlert}/>  
            )
          }
    </div>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  main:state.main
});

export default withRouter(connect(mapStateToProps, {})(Main));
