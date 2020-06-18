import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <>
        <div class="p-5 d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }
}
