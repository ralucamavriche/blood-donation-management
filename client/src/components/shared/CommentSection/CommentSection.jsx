import React, { Component } from "react";
import CommentCard from "./CommentCard";

export default class CommentSection extends Component {
  render() {
    return (
      <>
        <div className="row">
          <h1 class="display-4">Comments</h1>

          <hr class="my-4"></hr>
        </div>
        <div className="row">
          <section class="col comments">
            {this.props.comments.length && this.props.comments.map((e) => {
              return <CommentCard data={e} />;
            })}
          </section>
        </div>
      </>
    );
  }
}
