import React, { Component } from 'react'
import BreadcrumsModel from './../shared/Breadcrum/BreadcrumsModel';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, updateUserPassword } from '../../actions/mainActions'
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: (this.props.auth.user && this.props.auth.user.name )|| '',
            email: (this.props.auth.user && this.props.auth.user.email) || "",
            phone: (this.props.auth.user && this.props.auth.user.phone) || "",
            address: (this.props.auth.user && this.props.auth.user.address) || "",
            currentPassword: '',
            newPassword: '',
            newPassword2: ''
        }
    }
    hanldeChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmitDetails = async (e) => {
        e.preventDefault()
        await this.props.updateUser(this.props.auth.user._id, {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address
        })
    }

    handlePasswordChange = async (e) => {
        e.preventDefault()
        if(this.state.newPassword === this.state.newPassword2){
            await this.props.updateUserPassword(this.props.auth.user._id, {
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword,
                newPassword2: this.state.newPassword2
            })
        }else{
            alert('New Passwords are not the same! ')
        }
        
    }

    render() {
        if (this.props.auth.user && this.props.auth.user.name) {
            const { user } = this.props.auth;
            return (
                <>
                    <BreadcrumsModel
                        options={[{ to: "/", name: "Blood Donation" }]}
                        currentLink="Settings"
                    />
                    <div>
                        <div className="bootstrap snippet">
                            <div className="row">
                                <div className="col-sm-10"><h1>{user.name.toUpperCase()}</h1></div>
                                <div className="col-sm-2">Blood Donation</div>
                            </div>

                            <div className="row">
                                <div className="col-sm-3">


                                    <div className="text-center">
                                        <img src="https://socialerasmus.esn.org/sites/default/files/1200-5480-blood-donation-photo1.jpg" className="avatar img-circle img-thumbnail" alt="avatar" />
                                        {/* <h6>Upload a different photo...</h6>
                                    <input type="file" className="text-center center-block file-upload" /> */}
                                    </div><hr></hr><br></br>

                                    {/* <ul className="list-group">
                                        <li className="list-group-item text-muted">Activity</li>
                                        <li className="list-group-item text-left"><span className="pull-left"><strong>Timeline</strong></span> 2</li>
                                    </ul> */}

                                </div>
                                <div className="col-sm-9">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="home">
                                            <hr></hr>
                                            <form className="form" id="detailsForm" onSubmit={this.handleSubmitDetails}>
                                                <div className="form-group">

                                                    <div className="col-xs-6">
                                                        <label htmlFor="name_user"><h4>Name</h4></label>
                                                        <input required onChange={this.hanldeChange} value={this.state.name} type="text" className="form-control" name="name" id="name" placeholder="Name" title="enter your first name if any." />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label htmlFor="phone"><h4>Phone</h4></label>
                                                        <input minLength={10} required onChange={this.hanldeChange} pattern="[0-9]{10}" value={this.state.phone} type="tel" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any." />
                                                    </div>
                                                </div>
                                                <div className="form-group">

                                                    <div className="col-xs-6">
                                                        <label htmlFor="email"><h4>Email</h4></label>
                                                        <input required onChange={this.hanldeChange} value={this.state.email} type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-6">
                                                        <label htmlFor="address"><h4>Address</h4></label>
                                                        <input required onChange={this.hanldeChange} value={this.state.address} type="text" className="form-control" name="address" id="location" placeholder="Name" title="enter your first name if any." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-xs-12">
                                                        <br></br>
                                                        <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>

                                            <hr></hr>
                                            <form className="form" id="detailsForm2" onSubmit={this.handlePasswordChange}>
                                                <div className="form-group">
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="currentPassword"><h4>Current Password</h4></label>
                                                            <input required onChange={this.hanldeChange} value={this.state.currentPassword} type="password" className="form-control" name="currentPassword" id="currentPassword" placeholder="Current Password" title="enter your password." />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="newPassword"><h4>New Password</h4></label>
                                                            <input required minLength={6} onChange={this.hanldeChange} value={this.state.newPassword} type="password" className="form-control" name="newPassword" id="newPassword" placeholder="New Password" title="enter your password." />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="newPassword2"><h4>Verify New Password</h4></label>
                                                            <input required minLength={6} type="password" className="form-control" onChange={this.hanldeChange} value={this.state.newPassword2} name="newPassword2" id="newPassword2" placeholder="new password verify" title="enter your password2." />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-12">
                                                            <br></br>
                                                            <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Change Password</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )
        }

        else
            return null
    }
}
const mapStateToProps = (state) => ({
    donor: state.donor,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    main: state.main,
});

export default withRouter(
    connect(mapStateToProps, { updateUser,updateUserPassword })(Settings)
);
