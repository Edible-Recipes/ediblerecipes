import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "regenerator-runtime/runtime";
// import axios from "axios";

const Recipe = (props) => (
  <div className="result-recipe">
    <p>Recipe Name: {props.recipe.title}</p>
    <img src={props.recipe.image} />
    {/* <p>Instructions: {props.recipe.instruction}</p> */}
  </div>
);

class RecipeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };

    // this.deleteFav = this.deleteFav.bind(this)
  }

  async componentDidMount() {
    // axios
    //   .get("http://localhost:3000/resultrecipes/")
    //   .then((response) => {
    //     console.log("this is the response!", response);
    //     console.log("response.dataaa", response.data);
    //     this.setState({ recipes: response.data });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    console.log("in component did mount");

    const response = await fetch("/resultrecipes");
    //   .then((response) => response.json())
    const data = await response.json();
    console.log(data);

    this.setState({
      recipes: data,
    });
    //   .then((data) => console.log("FETCH data", data))
    //   .catch((err) => console.log("ERROR in login fetch", err));
  }

  //   componentDidUpdate() {
  // axios
  //   .get("http://localhost:3000/resultrecipes/")
  //   .then((response) => {
  //     this.setState({ recipes: response.data });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // fetch("http://localhost:3000/resultrecipes", {
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log("FETCH data", data))
  //   .catch((err) => console.log("ERROR in login fetch", err));
  //   }

  resultRecipe() {
    return this.state.recipes.map(function (recipe, i) {
      return <Recipe recipe={recipe} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Recipe Results</h1>
        <div className="favlist">{this.resultRecipe()}</div>;
      </div>
    );
  }
}

export default RecipeDisplay;
