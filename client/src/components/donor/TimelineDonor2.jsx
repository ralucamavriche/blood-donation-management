import React from "react";



export default function TimelineDonor2({historyData }) {
  return (
      
    <>
      <div className="container">
        <div className="page-header">
          <h1 id="">Timeline</h1>
        </div>
        <div id="timeline">
          <div className="row timeline-movement timeline-movement-top">
            <div className="timeline-badge timeline-future-movement">
              <a href="#">
                <i className="fas fa-plus"></i>
              </a>
            </div>
            <div className="timeline-badge timeline-filter-movement">
              <a href="#">
                <i className="far fa-clock"></i>
              </a>
            </div>
          </div>
          {historyData &&
            historyData.map((e) => {
              return (
                <>
                  <div className="row timeline-movement">
                    <div className="timeline-badge">
                      <span className="timeline-balloon-date-day">
                        {/* {e.date} */}
                        Frid
                      </span>
                    </div>
                    <div className="col-sm-6  timeline-item">
                      <div className="rowTimelineDonor">
                        <div className="col-sm">
                          <div className="timeline-panel credits">
                            <ul className="timeline-panel-ul">
                              <li>
                                <span className="importo">History</span>
                              </li>
                              <li>
                                <span className="causale">
                                  {e.specifications}{" "}
                                </span>{" "}
                              </li>
                              <li>
                                <p>
                                  <small className="text-muted">
                                    {" "}
                                    <i className="far fa-clock"></i> {e.date}
                                  </small>
                                </p>{" "}
                              </li>
                              <li>
                                <a
                                  href={e.url}
                                  className="btn btn-outline-dark"
                                >
                                  View Medical File
                                </a>
                              </li>
                              <li>
                                <a
                                  className=" mt-3 btn btn-outline-danger"
                                >
                                    Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6  timeline-item">
                      <div className="rowTimelineDonor">
                        <div className="col-sm-offset-1 col-sm">
                          <div className="timeline-panel debits">
                            <ul className="timeline-panel-ul">
                              <li>
                                <span className="importo">History</span>
                              </li>

                              <li>
                                <span className="causale">
                                  {e.specifications}{" "}
                                </span>{" "}
                              </li>
                              <li>
                                <p>
                                  <small className="text-muted">
                                    {" "}
                                    <i className="far fa-clock"></i> {e.date}
                                  </small>
                                </p>{" "}
                              </li>
                              <li>
                                <a
                                  href={e.url}
                                  className="btn btn-outline-dark"
                                >
                                  View Medical File
                                </a>
                              </li>
                              <li>
                                <a
                                  className=" mt-3 btn btn-outline-danger"
                                >
                                    Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
