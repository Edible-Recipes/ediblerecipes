const path = require("path");
const db = require("../models/edibleRecipesModels.js");
const fetch = require("node-fetch");
const edibleRecipeController = {};

//https://spoonacular.com/food-api/docs#Authentication
//API KEY: 4335e4647b4f4cc1b7a027fd1d3b1975
//an array of objects comes back

edibleRecipeController.storeIngredients = (req, res, next) => {
  console.log("in ediblerecipecontroller");
  //ONE SOLUTION TO STORE INGREDIENTS
  const ingredientsList = req.body;
  console.log(req.cookies.user_id);
  console.log("ingredientsList", ingredientsList);

  //I need the user ID to store in the create string
  //check if it already exist, then we can ignore it, else then we can add it (SQL command)
  for (let i = 0; i < ingredientsList.length; i++) {
    const value = ingredientsList[i];

    const create = `INSERT INTO ingredients (name, user_id) VALUES ($1, $2)`;
    let values = [value, req.cookies.user_id];
    db.query(create, values)
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch((err) => {
        console.log(err);
        const error = {
          log:
            "storeIngredients express error handler caught unknown middleware error",
          status: 400,
          message: { err: "An error occurred" },
        };
        next(error);
      });
  }
};

edibleRecipeController.getRecipes = (req, res, next) => {
  console.log("in getrecipes middleware");

  console.log("req.cookies.user_id", req.cookies.user_id);
  const search = `SELECT name FROM ingredients WHERE user_id=${req.cookies.user_id}`;

  db.query(search).then((data) => {
    console.log("this is the dsataa", data);
    let queryString = "";
    for (let i = 0; i < data.rows.length; i++) {
      queryString = queryString + ",+" + data.rows[i].name;
    }
    console.log("queryString", queryString);
    //https://api.spoonacular.com/recipes/?ingredients=apples,+flour,+sugar&instructionsRequired=true&apiKey=4335e4647b4f4cc1b7a027fd1d3b1975
    let getRecipes = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&apiKey=4335e4647b4f4cc1b7a027fd1d3b1975`;
    //https://api.spoonacular.com/recipes/?ingredients=apples,+flour,+sugar&instructionsRequired=true&apiKey=4335e4647b4f4cc1b7a027fd1d3b1975&instructionsRequired=true
    //FETCH
    fetch(getRecipes, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("result dataaa", data);
        res.locals.data = data;
        return next();
      })
      .catch((err) => console.log(err));
  });
};

module.exports = edibleRecipeController;
