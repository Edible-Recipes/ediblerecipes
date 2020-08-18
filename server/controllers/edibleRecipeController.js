const path = require("path");
const db = require("../models/edibleRecipesModels.js");
const fetch = require("node-fetch");
const edibleRecipeController = {};

//https://spoonacular.com/food-api/docs#Authentication
//API KEY: 4335e4647b4f4cc1b7a027fd1d3b1975
//an array of objects comes back

edibleRecipeController.storeIngredients = (req, res, next) => {
  //ONE SOLUTION TO STORE INGREDIENTS
  const ingredientsList = req.body;

  //I need the user ID to store in the create string
  /*Loop through each ingredient submitted to the backend and stores it in 
  our database(SQL command) based on user_id which we are persisting using a user_id cookie*/
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

  /*query search to postgresQL database to get the ingredients for each user.
  Needed to use the req.cookie.user_id in order to determine which user is currently on the site */
  const search = `SELECT name FROM ingredients WHERE user_id=${req.cookies.user_id}`;

  db.query(search).then((data) => {

    //queryString is created to insert in to the api request below called get recipes. Ingredients come back as an array.
    //example --> ['bread', 'chicken', 'cheese', 'lettuce']
    //queryString example --> 'bread,+chicken,+cheese,+lettuce'
    let queryString = "";
    for (let i = 0; i < data.rows.length; i++) {
      queryString = queryString + ",+" + data.rows[i].name;
    }

    //API request string labeled getRecipes used below in Fetch to get information from spoonacular API. 
    //Always need an API key at the end query (getRecipes), however, you can use my API if you need to do so. 
    /*Important!!!!!!!!: Only 150 request can be made per day to the API*/
    let getRecipes = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&apiKey=4335e4647b4f4cc1b7a027fd1d3b1975`;

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
