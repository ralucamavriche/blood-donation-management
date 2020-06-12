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
            {[0, 1, 2, 2, 2].map((e) => {
              return <CommentCard />;
            })}
          </section>
        </div>
      </>
    );
  }
}
