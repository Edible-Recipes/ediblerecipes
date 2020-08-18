const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const userController = require("./controllers/userController.js");
const cookieController = require("./controllers/cookieController.js");
const edibleRecipeController = require("./controllers/edibleRecipeController.js");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.json()); // --> Same as body parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", cookieController.setCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

// homepage - login;
app.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) =>
    // res.redirect('/recipesform')
    res.status(200).json(res.locals.user)
);

// // create a new account
app.post(
  "/signUp",
  userController.hashPassword,
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    // res.redirect('/recipesform');
    res.status(200).json(res.locals.user);
  }
);

app.get("/ingredients", (req, res) => {});

app.post(
  "/ingredients",
  edibleRecipeController.storeIngredients,
  (req, res) => {
    res.status(200).redirect("/resultrecipes");
  }
);

app.get("/resultrecipes", edibleRecipeController.getRecipes, (req, res) => {
  res.status(200).json(res.locals.data);
});

app.get("/savedrecipes", (req, res) => {});

app.post("/savedrecipes", (req, res) => {});

// //catch all router handlers
app.use((req, res) => {
  console.log("catch-all route handler is working");
});

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

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
