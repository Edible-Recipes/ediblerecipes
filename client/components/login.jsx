// import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import "../styles/App.css"
// import '../src/App.css';
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      password: this.state.password,
      email: this.state.email,
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => console.log("FETCH data", data))
      .catch((err) => console.log("ERROR in login fetch", err));

    //Redirect to recipes form after submitting info to login
    this.props.history.push("/recipesform");
  }

  render() {
    return (
      <div classname="loginpage"style={{ marginTop: 20 }}>
        <h2>Login</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              name="email"
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Password </label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
