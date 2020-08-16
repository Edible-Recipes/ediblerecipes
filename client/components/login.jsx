// import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
// import '../src/App.css';
import axios from 'axios';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//   name: '',
			password: '',
			email: '',
		};
		// this.onChangeUsername = this.onChangeUsername.bind(this);
		// this.onChangePassword = this.onChangePassword.bind(this);
		// this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange (e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			...this.state,
			[name]: value
		});
	}


	//   onChangePassword(e) {
	//     this.setState({
	//       password: e.target.value,
	//     });
	//   }

	// onChangeEmail (e) {
	// 	this.setState({
	// 		email: e.target.value
	// 	})
	// }

	onSubmit (e) {
		e.preventDefault();

		const user = {
			password: this.state.password,
			email: this.state.email,
		};

		console.log(user)
		//ask Grace and Wilmer about secretKey
		// axios
		// 	.post('http://localhost:3000/login', newUser)
		// 	.then((res) => console.log(res.data));

		// this.setState({
		// 	name: '',
		// 	password: '',
		// 	email: '',
		// });

		// this.props.history.push('/login');
		// this command above returns you to the homepage
	}

	render () {
		return (
			<div style={{ marginTop: 20 }}>
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
