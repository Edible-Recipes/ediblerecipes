const path = require("path");
const express = require("express");
const userController = require("./controllers/userController.js");
const app = express();
const PORT = 3000;

app.use(express.json()); // --> Same as body parser
app.use(express.urlencoded({ extended: true }));

// homepage - login
app.post(
  "/",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.redirect("/search");
    inger;
  }
);

// create a new account
app.post(
  "/signUp",
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.redirect("/search");
  }
);

// search page //two middleware func
app.use("/search", (req, res) => {
  res.send("Hello");
});

// search results - recipe links and videos
app.get("/results", (req, res) => {
  res.send("Hello");
});

// saved recipes
app.get("/savedRecipes", userController.getSavedRecipes, (req, res) => {
  res.send(res.locals.recipes);
});

//catch all router handlers
app.use((req, res) => {
  console.log("catch-all route handler is working");
  return res.sendStatus(404);
});

//middleware errors or controller
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log("Edible Recipes Server is up and running");
});
