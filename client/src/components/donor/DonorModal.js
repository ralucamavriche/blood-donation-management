import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addDonor,getDonors } from '../../actions/donorActions';
import {register} from '../../actions/authActions'
import PropTypes from 'prop-types';
import BreadcrumsModel from './../shared/Breadcrum/BreadcrumsModel';
import { withRouter } from 'react-router-dom';


class DonorModal extends Component {
    state = {
        modal: false,
        name: '',
        // email: (''+Math.random()).substr(2)+'blondi@yahoo.com',
        email: '',
        age: '',
        weight: '',
        phone_number: '',
        cnp:''

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newDonor = {
            name: this.state.name,
            email: this.state.email,
            age: this.state.age,
            weight: this.state.weight,
            phone_number: this.state.phone_number,
            currentUser: this.props.auth.user._id,
            cnp:this.state.cnp
        }

        const tempPass = 'name-123';
        this.props.addDonor(newDonor);
        const readyForAccount = {...newDonor,password:tempPass,role:'donor'};
        this.props.register(readyForAccount,null); 
        this.setState({
            modal: false,
        name: '',
        email: '',
        age: '',
        weight: '',
        phone_number: '',
        cnp:''
        })
        this.props.handleSet(newDonor)
        
        //Close modal
        this.toggle();

    }

    render() {
        return (
            <div>
                <BreadcrumsModel
          options={[{ to: "/", name: "Blood D" }]}
          currentLink="Donors List"
        />
                
                {this.props.isAuthenticated ? (
                    <Button
                        color="dark"
                        style={{ marginBottom: '2rem' }}
                        onClick={this.toggle}
                    ><i className="fas fa-plus-circle"></i> Add Donor
                    </Button>
                ) : (
                        <h5
                            className="mb-3 ml-4 text-center"
                            style={{ marginBottom: '2rem' }}> Please log in to manage donors</h5>
                    )}
                
                
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Donor List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <h4>Will create an account for the donor.</h4>
                                <Label htmlFor="donor">Donor</Label>
                                <Input
                                    required
                                    input="text"
                                    name="name"
                                    id="donor"
                                    value={this.state.name}
                                    placeholder="Add Name donor"
                                    onChange={this.onChange}
                                />
                                <Label for='email'>Email</Label>
                                <Input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    placeholder="Add Email"
                                    onChange={this.onChange}
                                />
                                <Label for='age'>Age</Label>
                                <Input
                                    required
                                    type="number"
                                    name="age"
                                    min={18}
                                    id="age"
                                    value={this.state.age}
                                    placeholder="Add Age"
                                    onChange={this.onChange}
                                />
                                <Label for='weight'>Weight</Label>
                                <Input
                                    required
                                    type="number"
                                    name="weight"
                                    min={50}
                                    id="weight"
                                    value={this.state.weight}
                                    placeholder="Add weight"
                                    onChange={this.onChange}
                                />
                                <Label for='phone_number'>Phone number</Label>
                                <Input
                                    required
                                    input="number"
                                    name="phone_number"
                                    min={10}
                                    id="phone_number"
                                    value={this.state.phone_number}
                                    placeholder="Add Phone Number"
                                    onChange={this.onChange}
                                />
                                <Label for='phone_number'>CNP</Label>
                                <Input
                                    required
                                    type="number"
                                    name="cnp"
                                    min={13}
                                    id="cnp"
                                    value={this.state.cnp || ''}
                                    placeholder="Add CNP"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block >Add donor
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal >
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    donor: state.donor,
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { addDonor,getDonors,register })(DonorModal));