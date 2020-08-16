// import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
// import '../src/App.css';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      // email: '',
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    // this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        'http://localhost:3000/WhatIsTheLinktoGetUsers' +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          name: response.data.name,
          password: response.data.password,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  // onChangeEmail (e) {
  // 	this.setState({
  // 		email: e.target.value
  // 	})
  // }

  onSubmit(e) {
    e.preventDefault();

    //function in here that compares the user input to our database, if it matches then we can redirect them to the form with ingredients to fill out

    //prob an axios.get to get all users to compare with this.state.name and this.state.password
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h2>Login</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeUserName}
            />
          </div>

          <div className="form-group">
            <label>Password </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          {/* <div className="form-group">
						<label>Email: </label>
						<input type="text"
							className="form-control"
							value={this.state.email}
							onChange={this.onChangeEmail}
						/>
					</div> */}

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
      // </div>
    );
  }
}
