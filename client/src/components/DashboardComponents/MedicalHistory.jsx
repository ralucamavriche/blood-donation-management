import React from "react";
import BreadcrumsModel from "../shared/Breadcrum/BreadcrumsModel";
import TimelineDonor from "./../donor/TimelineDonor";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as _ from "lodash";

function MedicalHistory(props) {
  if (_.isEmpty(props.auth.user)) return <h1>lod</h1>;
  else
    return (
      <>
        <BreadcrumsModel
          options={[{ to: "/", name: "Blood D" }]}
          currentLink="Timetable"
        />
        <div class="container">
          <div class="row">
            {props.auth && props.auth.user.role === "donor" &&
              props.donor.donors.map((don) => {
                if (props.auth.user.email === don.email) {
                  return <TimelineDonor historyData={don.history} />;
                } else return null;
              })}
          </div>
        </div>
      </>
    );
}

const mapStateToProps = (state) => ({
  donor: state.donor,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(MedicalHistory));
