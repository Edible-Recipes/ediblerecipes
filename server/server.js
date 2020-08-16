const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const edibleRecipeController = require('./controllers/edibleRecipeController.js');
const app = express();
const PORT = 3000;
const cors = require('cors');

// const db = require("./models/edibleRecipesModels.js");

app.use(cors());
app.use(express.json()); // --> Same as body parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/", userController.getAllUsers, (req, res) =>
//   res.status(200).json(res.locals.alluser)
// );

app.get('/', cookieController.setCookie, (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

// homepage - login;
app.post(
<<<<<<< HEAD
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => res.redirect('/recipesform')
  // res.status(200).json(res.locals.user)
=======
	'/login',
	userController.verifyUser,
	cookieController.setSSIDCookie,
	(req, res) => res.redirect('/recipesform')
	// res.status(200).json(res.locals.user)
>>>>>>> 7f8e7ee23d1bafe79d98089a0a125fc8da1028ee
);

// // create a new account
app.post(
	'/signUp',
	userController.hashPassword,
	userController.createUser,
	cookieController.setSSIDCookie,
	(req, res) => {
		res.redirect('/search');
		// res.status(200).json(res.locals.user);
	}
);
//
// // search page //two middleware func
app.get(
	'/search',
	// edibleRecipeController.getRecipes,
	(req, res) => {
		res.send('Hello');
	}
);

// search results - recipe links and videos
// app.get("/results", (req, res) => {
//   res.send("Hello");
// });

// // saved recipes
// app.get("/savedRecipes", userController.getSavedRecipes, (req, res) => {
//   res.send(res.locals.recipes);
// });

// //catch all router handlers
app.use((req, res) => {
	console.log('catch-all route handler is working');
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
