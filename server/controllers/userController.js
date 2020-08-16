const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// require in database
const db = require('../models/edibleRecipesModels.js');

const userController = {};

userController.verifyUser = async (req, res, next) => {
	try {
		console.log('IN VERIFY USER');
		// get login info
		// console.log('req.body', req.body);
		const { email, password } = req.body;
		// console.log(email, 'this is the email!!');

		// incomplete sign in
		if (!email || !password) {
			return next('Missing username or password in userController.verifyUser');
		}

		// console.log(email)

		// search parameters from the table for id and password
		// compare id and password to database info
		//SELECT password FROM users WHERE email = 'qwen@qwen.qwen';
		const searchUser = `SELECT password, _id FROM users WHERE email = '${email}'`;
		// console.log(searchUser);

		// query SQL database
		const data = await db.query(searchUser);
		console.log('data.rows in login', data.rows);

		if (!email) {
			return res.redirect('/signup');
		}

		if (!data.rows.length) {
			return res.render('Incorrect email or password. Please try again.');
		}

		// need to verify this after we have database set up
		const userPassword = data.rows[0].password;
		const id = data.rows[0]._id;
		console.log('COOKIES', req.cookies);
		const token = req.cookies.ssid;
		console.log('tokennn', token);
		const { secret } = req.cookies;
		console.log('secret in login', secret);

		await jwt.verify(token, secret, (err, decoded) => {
			console.log('inside JWT');
			console.log('decoded', decoded);
			if (err) console.log('JWT Verify error', err);
			else console.log('decoded', decoded);
		});

		// userPassword is from SQL
		// password is from login page
		await bcrypt.compare(password, userPassword, (err, match) => {
			// console.log('INSIDE BCRYPT COMPARE');
			// console.log('password', password);
			// console.log('userPassword', userPassword);
			if (err) {
				console.log('error in bcrypt.compare', err);
			}
			if (!match) return next({ err });
			// console.log('Successfully compared bcrypt');
			res.locals.user = data.rows[0];
			res.locals.userId = id;
			return next();
		});
	} catch (err) {
		next({
			log:
				'userController.verifyUser Express error handler caught unknown middleware error',
			status: 400,
			message: { err: 'An error occurred' },
		});
	}
};

userController.hashPassword = async (req, res, next) => {
	try {
		// console.log('IN HASH PASSWORD');
		let { email, password, name } = req.body;
		// console.log('email', email, 'password ', password, 'name', name);

		const SALT_WORK_FACTOR = 10;

		function genHash (salt, pw) {
			return new Promise((resolve, reject) => {
				bcrypt.hash(pw, salt, function (err, hash) {
					if (err) {
						reject(err);
					} else {
						resolve({ hash: hash });
					}
				});
			});
		}

		let hashedPassword = await genHash(SALT_WORK_FACTOR, password);
		// let hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
		//   console.log('hashhhhh', hash);
		//   if (err) return next('Error hashing password: ' + JSON.stringify(err));

		//   return hash;
		// });

		// console.log('hashed password', hashedPassword);
		res.locals.newUser = { password: hashedPassword.hash, name, email };
		// console.log('res.locals.newUser', res.locals.newUser);
		return next();
	} catch (err) {
		console.log('Error in hash password');
		return next({ err });
	}
};

userController.createUser = async (req, res, next) => {
	// console.log('IN CREATE USER');
	let { email, password, name } = res.locals.newUser;
	// console.log('email', email, 'password ', password, 'name', name);
	//   if (!email || !password) {
	//     return next("Missing username or password in userController.createUser");
	//   }

	//check if this work**********

	const create = `INSERT INTO users(email, password, name) VALUES ($1, $2,$3) RETURNING *`;

	const values = [email, password, name];
	// console.log('values inserted into sql', values);

	db.query(create, values)
		.then((data) => {
			// console.log('data!!!!!!!!!!!', data);
			// console.log('data.rows', data.rows);
			const userRow = data.rows.filter((row) => row.email === email);
			// console.log('userRow', userRow);
			res.locals.userId = userRow[0]._id;
			// console.log('res.locals.userId', res.locals.userId);
			return next();
		})
		.catch((err) => {
			console.log(err);
			const error = {
				log: 'createUser Express error handler caught unknown middleware error',
				status: 400,
				message: { err: 'An error occurred' },
			};
			next(error);
		});
};

// userController.getSavedRecipes = (req, res, next) => {
// 	// req.params the user
// 	const { id } = req.params;

// 	const search = `SELECT name FROM recipes WHERE user_id=${id}`;
// 	db.query(search)
// 		.then((data) => {
// 			//
// 			// console.log(data);
// 			res.locals.recipes = data.rows;
// 			return next();
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			const error = {
// 				log:
// 					'getSavedRecipes Express error handler caught unknown middleware error',
// 				status: 400,
// 				message: { err: 'An error occurred' },
// 			};
// 			next(error);
// 		});
// };

module.exports = userController;
