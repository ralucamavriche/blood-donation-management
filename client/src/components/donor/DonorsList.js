import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { getDonors, deleteDonor } from "../../actions/donorActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import DonorModal from "./DonorModal";
import Spinner from "./../shared/Spinner";
import Alert from "./../shared/Alert/Alert";

class DonorsList extends Component {
  static propTypes = {
    getDonors: PropTypes.func.isRequired,
    donor: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getDonors();
  }

  onDeleteClick = (id) => {
    this.props.deleteDonor(id);
  };

  handleSet = (newDonor) => {
    this.props.getDonors();
    this.forceUpdate();
  };

  render() {
    const { donors, loading } = this.props.donor;
    const { user } = this.props.auth;
    if (loading === true) return <Spinner />;
    else
      return (
        <>
          <DonorModal handleSet={this.handleSet} />
          <ListGroup>
            <ListGroupItem>
              <h2 className="text-center"> Donors List</h2>
            </ListGroupItem>
            {user &&
              donors.map(({ _id, name, createdBy }) => {
                if (user._id === createdBy)
                  return (
                    <ListGroupItem>
                      <>
                        {this.props.isAuthenticated && (
                          <div>
                            <Button
                              className="edit-btn float-right"
                              color="success"
                              size="sm"
                              onClick={(event) =>
                                this.props.history.push(`/donors/edit/${_id}`)
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              className="remove-btn float-right"
                              color="danger"
                              size="sm"
                              onClick={this.onDeleteClick.bind(this, _id)}
                            >
                              {" "}
                              Remove 
                            </Button>
                          </div>
                        )}
                        {name}
                      </>
                    </ListGroupItem>
                  );
              })}
          </ListGroup>
          {this.props.main.isOpenAlert === true && (
            <Alert
              text={this.props.main.text}
              style={this.props.main.style}
              handleClose={this.props.closeAlert}
            />
          )}
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  donor: state.donor,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  main: state.main,
});

export default withRouter(
  connect(mapStateToProps, { getDonors, deleteDonor })(DonorsList)
);
