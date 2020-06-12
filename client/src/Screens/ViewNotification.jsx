import React, { Component } from "react";
import axios from 'axios'

export default class ViewNotification extends Component {
    componentDidMount() {
        const arrayOfViews = []
        // get id of user
        // get array of views get viewdBy
        // if(id is not in viedBy)
        // axios.patch
        // this.props.auth.user._id
        // 
        // change 
        /*
        {
            "viewedBy:["5ee24eac50b0990e5ca832ae"]
        }
        */
        // axios.patch('url/12314214',{viewedBy:arrayOfViews}).then(r => console.log('updated'))
    }
  render() {
    return (
      <>
        <h1>View Notification</h1>
        <h5>{window.location.pathname}</h5>
      </>
    );
  }
}

