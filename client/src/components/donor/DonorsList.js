import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getDonors, deleteDonor } from '../../actions/donorActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class DonorsList extends Component {

    static propTypes = {
        getDonors: PropTypes.func.isRequired,
        donor: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getDonors();
    }

    onDeleteClick = id => {
        this.props.deleteDonor(id);

    }

    handleSet = (newDonor) => {
        this.props.getDonors();
        this.forceUpdate()
    }

    render() {

        const { donors, loading } = this.props.donor;
        const { user } = this.props.auth;
        console.log('user',user)
        if(loading === true)
        return (<div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>);
      else
        return  (
            <>
                <DonorModal handleSet={this.handleSet} />
               
                <ListGroup>
                    {/* <div className="donors-list"> */}
                        <ListGroupItem>
                            Donors List
                    </ListGroupItem>
                        {user && donors.map(({ _id, name,createdBy }) => {
                            if(user._id ===  createdBy )
                                return (
                                    <ListGroupItem>
                                       <>
                                       {this.props.isAuthenticated  && (
                                            <div>
                                                <Button
                                                    className="edit-btn float-right"
                                                    color="success"
                                                    size="sm"
                                                    onClick={
        
                                                        event => this.props.history.push(`/donors/edit/${_id}`)
                                                    }
                                                >
                                                    Edit 
                                                 </Button>
                                                  
                                                <Button
                                                    className="remove-btn float-right"
                                                    color="danger"
                                                    size="sm"
                                                    onClick={this.onDeleteClick.bind(this, _id)}
                                                > Remove
                                                    &times;
                                            </Button>
                                            </div>
                                        )}
                                        {name}
                                                    </>
                                    </ListGroupItem>
                                )
                            // return <h1>Empty</h1>
                        })}
                    {/* </div> */}
                </ListGroup>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    donor: state.donor,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, { getDonors, deleteDonor })(DonorsList));