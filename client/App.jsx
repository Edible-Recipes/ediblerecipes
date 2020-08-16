import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CreateUser from './components/login.jsx';
import Login from './components/signup.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1 className="display-4">Welcome to Edible Recipes!</h1>

          <a class="btn btn-primary" href="/signUp" role="button">
            Sign Up
          </a>
          <a class="btn btn-primary" href="/login" role="button">
            Log In
          </a>

          <Route path="/signUp" exact component={CreateUser} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
