// import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
// import '../src/App.css';
import axios from 'axios';

export default class RecipeForms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			email: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChange (e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			...this.state,
			[name]: value
		});
	}

	onSubmit (e) {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			password: this.state.password,
			email: this.state.email,
		};

		console.log(newUser)
		//ask Grace and Wilmer about secretKey
		axios
			.post('http://localhost:3000/signUp', newUser)
			.then((res) => console.log(res.data));

		this.setState({
			name: '',
			password: '',
			email: '',
		});

		this.props.history.push('/login');
		// this command above returns you to the homepage
	}

	render () {
		return (
			<div style={{ marginTop: 20 }}>
				<h2>Sign Up</h2>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<input
							name="name"
							type="text"
							className="form-control"
							defaultValue={this.state.name}
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<label>Password </label>
						<input
							name="password"
							type="password"
							className="form-control"
							defaultValue={this.state.password}
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<label>Email: </label>
						<input type="text"
							name="email"
							className="form-control"
							defaultValue={this.state.email}
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="submit"
							defaultValue="Create New User"
							className="btn btn-primary"
						/>
					</div>
				</form>
			</div>
			// </div>
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