import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "regenerator-runtime/runtime";

const Recipe = (props) => (
  <div className="result-recipe">
    {/* <button id={props.recipe.id} onClick={() => props.getRecipe()}>{props.recipe.title}
    <img src={props.recipe.image} /> </button> */}
    <p>Recipe Name: {props.recipe.title}</p>
    <img src={props.recipe.image} />
    {/* <p>Instructions: {props.recipe.instruction}</p> */}
  </div>
);

class RecipeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }

  async componentDidMount() {
    const response = await fetch("/resultrecipes");
    const data = await response.json();
    console.log(data);

    this.setState({
      recipes: data,
    });
  }

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
