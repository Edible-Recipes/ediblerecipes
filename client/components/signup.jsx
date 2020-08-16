// import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
// import '../src/App.css';
import axios from 'axios';

export default class CreateUser extends Component {
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

    const newUser = {
      name: this.state.name,
      password: this.state.password,
      // email: this.state.email,
    };

    axios
      .post('http://localhost:3000/signUp', newUser)
      .then((res) => console.log(res.data));

    this.setState({
      name: '',
      password: '',
      // email: '',
    });

    this.props.history.push('/');
    //this command above returns you to the homepage
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h2>Sign Up</h2>
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
            <input
              type="submit"
              value="Create New User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
      // </div>
    );
  }
}
