const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const userController = require("./controllers/userController.js");
const cookieController = require("./controllers/cookieController.js");
const edibleRecipeController = require("./controllers/edibleRecipeController.js");
const app = express();
const PORT = 3000;

// const db = require("./models/edibleRecipesModels.js");

app.use(express.json()); // --> Same as body parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/", userController.getAllUsers, (req, res) =>
//   res.status(200).json(res.locals.alluser)
// );

// homepage - login;
app.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => res.redirect("/search")
  // res.status(200).json(res.locals.user)
);

// // create a new account
app.post(
  "/signUp",
  userController.createUser,
  cookieController.setCookie,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.redirect("/search");
    // res.status(200).json(res.locals.user);
  }
);
//
// // search page //two middleware func
app.get(
  "/search",
  // edibleRecipeController.getRecipes,
  (req, res) => {
    res.send("Hello");
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
  console.log("catch-all route handler is working");
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
