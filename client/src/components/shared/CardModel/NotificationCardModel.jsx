import React from "react";
import Moment from 'react-moment';
export default function NotificationCardModel({request}) {
    // const date = new Date(props.date);
    console.log(request)
    const date = request.title ? new Date(request.date) : new Date();
 return request.title ? (
   <div className="row mb-4 ">
      <div className=" col  card text-center">
        <div className="card-header">Notifications</div>
        <div className="card-body">
          <h5 className="card-title">{request.title || 'No title'}</h5>
          <p className="card-text">
           {request.description}
          </p>
          <a href="#" className="btn btn-primary">
            Vezi Notificare
          </a>
        </div>

        <div className="card-footer text-muted">
            <Moment fromNow>{date}</Moment>
        </div>
      </div>
    </div>
  ):null;
}
