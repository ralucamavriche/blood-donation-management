import React from "react";

export default function TimelineDonor({ historyData }) {
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
                        <h2 className="title">Specifications:</h2>
                        <p className="pb-3 description">{e.specifications}</p>
                        <a href={e.url} className="btn btn-outline-dark">
                          View Medical File
                        </a>
                        {/* <a href={e.url} className=" ml-3 btn btn-outline-danger">
                          Delete
                        </a> */}
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
