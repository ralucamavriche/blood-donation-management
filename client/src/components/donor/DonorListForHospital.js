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
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired

    };

    componentDidMount() {
        this.props.getDonors();
    }

    onDeleteClick = id => {
        this.props.deleteDonor(id);
    }

    render() {

        const { donors } = this.props.donor;
        const { user } = this.props.auth;
        return (
            <Container>
                <h5 className="mb-3 ml-4 text-center">
                    {user ? `Lista donatori spital ${user.name}:` : 'Lista donatori spital goala. Va rugam sa va logati.'}</h5>
                <ListGroup>
                    <TransitionGroup className="donors-list">

                        {donors.map(({ _id, name, createdBy }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated && createdBy === user._id ? (

                                        <div>
                                            <Button
                                                className="edit-btn float-right"
                                                color="success"
                                                size="sm"
                                                onClick={
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
                                            > Remove
                                                                                        &times;
                                            </Button>
                                            {name}

                                        </div>

                                    ) : null}
                                </ListGroupItem>

                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    donor: state.donor,
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { getDonors, deleteDonor })(DonorsList));