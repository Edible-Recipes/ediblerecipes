const path = require("path");
const db = require("../models/edibleRecipesModels.js");

const edibleRecipeController = {};

//https://spoonacular.com/food-api/docs#Authentication
//API KEY: 4335e4647b4f4cc1b7a027fd1d3b1975
//an array of objects comes back

edibleRecipeController.storeIngredients = (req, res, next) => {
  console.log("in ediblerecipecontroller");
  //ONE SOLUTION TO STORE INGREDIENTS
  const { ingredientsList } = req.body;
  console.log(req.cookies.user_id);

  //I need the user ID to store in the create string
  //check if it already exist, then we can ignore it, else then we can add it (SQL command)
  for (let i = 0; ingredientsList.length; i++) {
    const value = ingredientsList[i];
    const create = `INSERT INTO ingredients (name, user_id) VALUES (${value}, ${req.cookies.user_id})`;

    db.query(create, value)
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
  const search = `SELECT name FROM ingredients WHERE user_id=${id}`;

  db.query(search).then((data) => {
    let queryString = "";
    for (let i = 0; i < data.length; i++) {
      queryString = queryString + "ingredients=+" + data[i].name;
    }

    let search = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&apiKey=4335e4647b4f4cc1b7a027fd1d3b1975`;
  });

  //FETCH request instead of DB query
  db.query(search)
    .then((data) => {
      res.locals.recipes = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      const error = {
        log: "getRecipes express error handler caught unknown middleware error",
        status: 400,
        message: { err: "An error occurred" },
      };
      next(error);
    });
};

module.exports = edibleRecipeController;
