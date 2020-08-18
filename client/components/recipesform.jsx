// import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
// import '../src/App.css';
import axios from "axios";

export default class RecipeForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    let value = target.value;
    let joined = this.state.ingredients.concat(value);
    if (target.checked) {
      this.setState({
        ingredients: joined,
      });
    }
  }


  onSubmit(e) {
    e.preventDefault();

    const ingredientsList = this.state.ingredients;
    console.log(ingredientsList);

    fetch("http://localhost:3000/ingredients", {
      method: "POST",
      body: JSON.stringify(ingredientsList),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // this command below returns you to the homepage
    this.props.history.push("/resultrecipe");
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <br />
            <br />
            <form>
              <div className="add">
                <h2>Add Ingredients</h2>
                <input className="addForm" type="text" value="" />
              </div>
            </form>
            <h3>Ingredients List</h3>
            <br />
            <form onSubmit={this.onSubmit}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Ingredients :</label>
                  <br />
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="bread"
                      value="bread"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="bread"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Bread
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="eggs"
                      value="eggs"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="eggs"
                      class="form-check-label"
                      for="inlineCheckboxh2"
                    >
                      Eggs
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="lettuce"
                      value="lettuce"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="lettuce"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Lettuce
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="tomato"
                      value="tomato"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="tomato"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Tomato
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="cucumber"
                      value="cucumber"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="cucumber"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Cucumber
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="onion"
                      value="onion"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="onion"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Onion
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="Shrimp"
                      value="Shrimp"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="Shrimp"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Shrimp
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="pork"
                      value="pork"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="pork"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Pork
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="pepper"
                      value="pepper"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="pepper"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Pepper
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="chicken"
                      value="chicken"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="chicken"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Chicken
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="beef"
                      value="beef"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="beef"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Beef
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="cheese"
                      value="cheese"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="cheese"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Cheese
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="bacon"
                      value="bacon"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="bacon"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Bacon
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="sausage"
                      value="sausage"
                      onChange={this.handleInputChange}
                    />
                    <label
                      htmlFor="sausage"
                      class="form-check-label"
                      for="inlineCheckboxh1"
                    >
                      Sausage
                    </label>
                  </div>


                </div>
              </div>

              <div class="form-row">
                <div class="col-md-12 text-center">
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}