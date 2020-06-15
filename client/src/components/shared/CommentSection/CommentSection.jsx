import React, { Component } from "react";
import CommentCard from "./CommentCard";
import { Container } from "reactstrap";

export default class CommentSection extends Component {
  render() {
    return (
      <>
        <div className="container py-3">
          <div className="row">
            <div className="card" style={{width:"100%"}}>
              <div className="card-header" style={{background: '#03A9F4'}}>
              <h4 class="mb-0">Comments:</h4>
              </div>
              <div className="card-body">
                <div className="text">
                {this.props.comments.length &&
                  this.props.comments.map((e) => {
                    return <CommentCard data={e} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <h1 class="display-4">Comments</h1>

          <hr class="my-4"></hr>
        </div>
        <div className="row">
            {this.props.comments.length && this.props.comments.map((e) => {
              return <CommentCard data={e} />;
            })}
        </div> */}
      </>
    );
  }
}
