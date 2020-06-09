import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
} from 'reactstrap';

class BloodRequest extends Component {
    state = {
        modal: false,
        title: '',
        author:'',
        description: '',
        blood_type: ''

    };


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
        const { title, author, description, blood_type } = this.state;

        //Create reques object
        const newRequest = {
            title,
            author,
            description,
            blood_type
        };

        // this.props.addRequest(newRequest); 
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Cerere Sange
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Cerere Sange</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='title'>Title</Label>
                                <Input
                                    type='text'
                                    name='title'
                                    id='title'
                                    value={this.state.title}
                                    placeholder='Title'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='author'>Author</Label>
                                <Input
                                    type='text'
                                    name='author'
                                    id='author'
                                    value={this.state.author}
                                    placeholder='Author'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='description'>Description</Label>
                                <Input
                                    type='text'
                                    name='description'
                                    id='description'
                                    value={this.state.description}
                                    placeholder='Description'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='blood_type'>Blood type </Label>
                                <Input
                                    type='text'
                                    name='blood_type'
                                    id='blood_type'
                                    value={this.state.type}
                                    placeholder='Blood type'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color='dark'
                                    style={{ marginTop: '2rem' }}
                                    block >Trimite
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal >
            </div>
        )
    }
}

export default BloodRequest;