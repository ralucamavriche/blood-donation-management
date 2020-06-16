import React from "react";
import BreadcrumsModel from "../shared/Breadcrum/BreadcrumsModel";

export default function MedicalHistory() {
  return (
    <>
      <BreadcrumsModel
        options={[{ to: "/", name: "Blood D" }]}
        currentLink="Timetable"
      />
      <div class="container">
        <h4 className="p-3 ">Timeline :</h4>
        <div class="row">
          <div class="col-md-12">
            <div class="main-timeline8">
              <div class="timeline">
                <span class="timeline-icon"></span>
                <span class="year">2017</span>
                <div class="timeline-content">
                  <h3 class="title">Blood Donation</h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus mattis justo id pulvinar suscipit. Pellentesque
                    rutrum vehicula erat sed dictum. Integer quis turpis magna.
                    Suspendisse tincidunt elit at erat tincidunt, vel vulputate
                    arcu dapibus. Etiam accumsan ornare posuere. Nullam est.
                  </p>
                </div>
              </div>
              <div class="timeline">
                <span class="timeline-icon"></span>
                <span class="year">2016</span>
                <div class="timeline-content">
                  <h3 class="title">Blood Donation</h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus mattis justo id pulvinar suscipit. Pellentesque
                    rutrum vehicula erat sed dictum. Integer quis turpis magna.
                    Suspendisse tincidunt elit at erat tincidunt, vel vulputate
                    arcu dapibus. Etiam accumsan ornare posuere. Nullam est.
                  </p>
                </div>
              </div>
              <div class="timeline">
                <span class="timeline-icon"></span>
                <span class="year">2015</span>
                <div class="timeline-content">
                  <h3 class="title">Blood Donation</h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus mattis justo id pulvinar suscipit. Pellentesque
                    rutrum vehicula erat sed dictum. Integer quis turpis magna.
                    Suspendisse tincidunt elit at erat tincidunt, vel vulputate
                    arcu dapibus. Etiam accumsan ornare posuere. Nullam est.
                  </p>
                </div>
              </div>
              <div class="timeline">
                <span class="timeline-icon"></span>
                <span class="year">2014</span>
                <div class="timeline-content">
                  <h3 class="title">Blood Donation</h3>
                  <p class="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus mattis justo id pulvinar suscipit. Pellentesque
                    rutrum vehicula erat sed dictum. Integer quis turpis magna.
                    Suspendisse tincidunt elit at erat tincidunt, vel vulputate
                    arcu dapibus. Etiam accumsan ornare posuere. Nullam est.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <hr></hr> */}
    </>
  );
}
