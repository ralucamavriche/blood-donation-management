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

    render() {

        const { donors } = this.props.donor;
        const { user } = this.props.auth;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="donors-list">
                        {donors.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ? (
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
                                    ) : null}
                                    {name}

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
    donor: state.donor,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, { getDonors, deleteDonor })(DonorsList));