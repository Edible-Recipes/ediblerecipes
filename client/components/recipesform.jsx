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

  //addIngredient

  //deleteIngredient

  // handleChange(e) {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({
  //     ...this.state,
  //     [name]: value,
  //   });
  // }

  handleInputChange(event) {
    const target = event.target;

    let value = target.value;
    // console.log("name", event.target.name);
    // console.log("value", event.target.value);
    let joined = this.state.ingredients.concat(value);
    if (target.checked) {
      this.setState({
        ingredients: joined,
      });
    }
  }

  // if (target.checked) {
  //   this.ifstate.ingredients[value] = value;
  // } else {
  //   this.state.ingredients.splice(value, 1);
  // }

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

    // const newUser = {
    //   name: this.state.name,
    //   password: this.state.password,
    //   email: this.state.email,
    // };

    //ask Grace and Wilmer about secretKey
    // axios
    //   .post("http://localhost:3000/signUp", newUser)
    //   .then((res) => console.log(res.data));

    // this.setState({
    //   name: "",
    //   password: "",
    //   email: "",
    // });

    // this.props.history.push("/login");
    // this command above returns you to the homepage
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
                <h2>Add Ingrediants</h2>
                <input className="addForm" type="text" value="" />
              </div>
            </form>
            <h3>Ingrediants List</h3>
            <br />
            <form onSubmit={this.onSubmit}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Ingrediants :</label>
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
                    <label class="form-check-label" for="inlineCheckboxh1">
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
                    <label class="form-check-label" for="inlineCheckboxh2">
                      Eggs
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
                    <label class="form-check-label" for="inlineCheckboxh2">
                      Cheese
                    </label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="bacon"
                      value="bacon"
                      onChange={this.handleInputChange}
                    />
                    <label class="form-check-label" for="inlineCheckboxh2">
                      Bacon
                    </label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="ingredients"
                      id="sausage"
                      value="sausage"
                      onChange={this.handleInputChange}
                    />
                    <label class="form-check-label" for="inlineCheckboxh3">
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
// // import 'bootstrap/dist/css/bootstrap.css';
// import React, { Component } from 'react';
// // import '../src/App.css';
// import axios from 'axios';

// export default class SignUp extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			name: '',
// 			password: '',
// 			email: '',
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 		this.onSubmit = this.onSubmit.bind(this);
// 	}

// 	handleChange (e) {
// 		const name = e.target.name;
// 		const value = e.target.value;
// 		this.setState({
// 			...this.state,
// 			[name]: value
// 		});
// 	}

// 	onSubmit (e) {
// 		e.preventDefault();

// 		const newUser = {
// 			name: this.state.name,
// 			password: this.state.password,
// 			email: this.state.email,
// 		};

// 		console.log(newUser)
// 		//ask Grace and Wilmer about secretKey
// 		// axios
// 		// 	.post('http://localhost:3000/signUp', newUser)
// 		// 	.then((res) => console.log(res.data));

// 		// this.setState({
// 		// 	name: '',
// 		// 	password: '',
// 		// 	email: '',
// 		// });

// 		this.props.history.push('/login');
// 		// this command above returns you to the homepage
// 	}

// 	render () {
// 		return (
// 			<div style={{ marginTop: 20 }}>
// 				<h2>Sign Up</h2>
// 				<form onSubmit={this.onSubmit}>

// 					<h3> Dairy</h3>
// 					<div class="form-check form-check-inline">
// 						<input class="form-check-input" type="checkbox" name="lettuce" value="lettuce">
// 							<label class="form-check-label" for="inlineCheckbox1">Lettuce</label>
//                     </div>
// 						<div class="form-check form-check-inline">
// 							<input class="form-check-input" type="checkbox" name="pasta" value="pasta">
// 								<label class="form-check-label" for="inlineCheckbox2">Pasta</label>
//                     </div>
// 							<div class="form-check form-check-inline">
// 								<input class="form-check-input" type="checkbox" name="eggs" value="eggs" disabled>
// 									<label class="form-check-label" for="inlineCheckbox3">Eggs</label>
//                     </div>
// 								<div class="form-check form-check-inline">
// 									<input class="form-check-input" type="checkbox" name="bread" value="bread" disabled>
// 										<label class="form-check-label" for="inlineCheckbox3">Bread</label>
//                     </div>

// 									{/* <div className="form-group">
// 						<label>Username: </label>
// 						<input
// 							name="name"
// 							type="text"
// 							className="form-control"
// 							defaultValue={this.state.name}
// 							onChange={this.handleChange}
// 						/>
// 					</div> */}

// 									<div className="form-group">
// 										<input
// 											type="submit"
// 											defaultValue="Ingredients"
// 											className="btn btn-primary"
// 										/>
// 									</div>
// 				</form>
// 							</div>
// 		);
// 	}
// }
