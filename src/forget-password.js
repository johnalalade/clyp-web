import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "./axios";

export default class Password extends Component {
    constructor() {
        super()
        this.state = {
            page: "Changeing",
            password: "",
            cPassword: "",
            err: "",
        }
    }

    submit = () => {
        let user = {
            id: this.props.match.params.id,
            password: this.state.password
        }
        if (user.password.trim() !== this.state.cPassword.trim()) {
            this.setState({ err: 'Password does not match' })
            toast.error('Password does not match')
            return false
        }
        else if (user.password.trim().length < 8) {
            this.setState({ err: 'Password must be atleast 8 characters' })
            toast.error('Password must be atleast 8 characters')
            return false
        }
        else {
            axios.post('/reset', user, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
                .then((res) => {
                    if (res.data) {
                       this.setState({
                           page: "Done"
                       })
                    }
                    else { return }
                })
                .then((res) => { toast.success('Password reset, Successful.') })

                .catch(err => { toast.error('Login Failed, Please Try Again.') })
        }
    }

    render() {
        return (
            <div className="surrounding-div">
                <div className="white-div">
                    {this.state.page === "Changeing" ?
                        <div className="activity-div">

                            <img src={require("./images/h-image.png")} classNamepassword="h-image" alt="heading_image" />

                            <p className="name">Reset your password</p>

                            <div className="forms-i">
                                <p className="label">Password:</p>
                                <input onChange={(ev) => {
                                    this.setState({
                                        password: ev.target.value
                                    })
                                }} value={this.state.password} className="input" type="password" />
                            </div>

                            <div className="forms-i">
                                <p className="label">Confirm Password: </p>
                                <input onChange={(ev) => {
                                    this.setState({
                                        cPassword: ev.target.value
                                    })
                                }} value={this.state.cPassword} className="input" type="password" />
                            </div>

                            <br />
                            <div className="button btn btn-warning form-control">
                                <p style={{ color: "whitesmoke", fontWeight: "600" }} onClick={() => { this.submit() }}>Submit</p>
                            </div>
                        </div>
                        :
                        <div className="activity-div2">

                            <p className="success-message">You've successfully changed your Clyp password</p>

                        </div>
                    }
                </div>
                <ToastContainer />
            </div>
        )
    }
}