import React, { Component } from "react";
import FlutterwaveHook from "./flutterwavehooks";
import axios from "./axios";
import "./style.css"

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      amount: null,
      page: "Paying"
    }
  }

  componentDidMount() {

    axios.post('/user', { userID: this.props.match.params.id })
      .then(data => {
        this.setState({
          user: data.data.response
        })
      })
      .catch(err => {
        alert("Error fetching user data, please reload")
      })
  }

  submit = (response) => {
    if (response.status === "successful") {
      this.setState({
        page: "Completed"
      })
    }
    else {
      this.setState({
        page: "Paying"
      })
    }

  }

  render() {
    return (
      <div className="surrounding-div">
        <div className="white-div">
          {this.state.page === "Paying" ?
            <div className="activity-div">

              <img src={require("./images/h-image.png")} className="h-image" alt="heading_image" />

              <p className="name">Send money to {this.state.user.name}</p>

              <div className="forms-i">
                <p className="label">Amount ({this.state.user.currency}):</p>
                <input onChange={(ev) => {
                  this.setState({
                    amount: ev.target.value
                  })
                }} value={this.state.amount} className="input" />
              </div>

              <br />
              <div className="button">
                <FlutterwaveHook id={this.state.user._id} currency={this.state.user.currency} amount={this.state.amount} email={this.state.user.email} phone={this.state.user.phone} username={this.state.name} submit={this.submit} />
              </div>
            </div>
            :
            <div className="activity-div2">

              <p className="success-message">You've successfully sent {this.state.user.currency} {this.state.amount} to {this.state.user.name}'s Clyp wallet</p>

            </div>
          }
        </div>
      </div>
    )
  }

}