const path = require("path");
const db = require("../models/edibleRecipesModels.js");

const edibleRecipeController = {};

//https://spoonacular.com/food-api/docs#Authentication
//API KEY: 4335e4647b4f4cc1b7a027fd1d3b1975
//an array of objects comes back

edibleRecipeController.storeIngredients = (req, res, next) => {
  //ONE SOLUTION TO STORE INGREDIENTS
  //I need the user ID to store in the create string
  /*for(let i = 0; req.body.array.length; i++){
        const create = `INSERT INTO ingredients (name) VALUES ($1) WHERE user_id = ${}`;
        const value = array[i];

        db.query(create, value)
        .then((data) => {
            console.log(data);
            return next();
        })
        .catch((err) => {
            console.log(err);
            const error = {
                log: 'storeIngredients express error handler caught unknown middleware error',
                status: 400,
                message: { err: 'An error occurred'}
            };
            next(error);
        })*/
  //SECOND SOLUTION TO STORE INGREDIENTS
  /*const { milk, bread, eggs, apples, oranges } = req.body;

        const create = `INSERT INTO USERS VALUES ($1, $2, $3, $4, $5)`;

        const values = [milk, break, eggs, apples, oranges];

        db.query(create, values)
        .then((data) => {
            console.log(data);
            return next();
        })
        .catch((err) => {
             console.log(err);
            const error = {
                log: 'storeIngredients express error handler caught unknown middleware error',
                status: 400,
                message: { err: 'An error occurred'}
            };
            next(error);
        })*/
};

edibleRecipeController.getRecipes = (req, res, next) => {
  const search = `SELECT name FROM ingredients WHERE user_id=${id}`;

  db.query(search).then((data) => {
    let queryString = "";
    for (let i = 0; i < data.length; i++) {
      string = string + ",+" + data[i].name;
    }

    let search = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&apiKey=4335e4647b4f4cc1b7a027fd1d3b1975`;
  });

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
