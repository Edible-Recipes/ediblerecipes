import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SignUp from "./components/signup.jsx";
import Login from "./components/login.jsx";
import RecipesForm from "./components/recipesform.jsx";
import DisplayRecipe from "./components/recipesdisplay.jsx";
import "./styles/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="homepage">
          <h1 className="display-4">Welcome to Edible Recipes!</h1>
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/recipesform">Recipes Form</Link>
            </li>
          </ul>

          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/recipesform" exact component={RecipesForm} />
          <Route path="/resultrecipe" exact component={DisplayRecipe} />
        </div>
      </Router>
    );
  }
}

export default App;
