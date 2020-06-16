import React from "react";

export default function TimelineDonor({ historyData }) {
  console.log('hiii',historyData)
  return (
    <>
      <hr></hr>
      <div className="container">
        <h3 className="py-4">Timeline: </h3>
        <div className="row">
          <div className="col-md-12">
            <div className="main-timeline8">
              {historyData &&
                historyData.map((e) => {
                  return (
                    <div className="timeline">
                      <span className="timeline-icon"></span>
                      <span className="year">{e.date}</span>
                      <div className="timeline-content">
                        <h3 className="title">Blood Donation</h3>
                        <p className="description">
                          {e.specifications}
                        </p>
                        <a href={e.url} className="btn btn-success">View Settings</a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
}
