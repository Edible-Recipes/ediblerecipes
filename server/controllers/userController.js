const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// require in database
const db = require("../models/edibleRecipesModels.js");

const userController = {};

// userController.getAllUsers = async (req, res, next) => {
//   console.log("IN GET ALL USERS");

//   try {
//     // const { name, password, email } = req.body;

//     const search = `SELECT * FROM users`;

//     const data = await db.query(search);
//     console.log(data.rows);
//     res.locals.allusers = data.rows;
//     return next();
//   } catch (err) {
console.log("ERROR IN getallusers");
//   }
// };

userController.verifyUser = async (req, res, next) => {
  try {
    // get login info
    console.log("req.body", req.body);
    const { email, password } = req.body;
    console.log(email, "this is the email!!");

    // incomplete sign in
    if (!email || !password) {
      return next("Missing username or password in userController.verifyUser");
    }

    // console.log(email)

    // search parameters from the table for id and password
    // compare id and password to database info
    //SELECT password FROM users WHERE email = 'qwen@qwen.qwen';
    const searchUser = `SELECT password FROM users WHERE email = '${email}'`;
    console.log(searchUser);

    // query SQL database
    const data = await db.query(searchUser);
    console.log("data.rows in login", data.rows);

    if (!email) {
      return res.redirect("/signUp");
    }

    if (!data.rows.length) {
      return res.render("Incorrect email or password. Please try again.");
    }

    // need to verify this after we have database set up
    const userPassword = data.rows[0].password;

    const token = req.cookies.ssid;
    console.log("tokennn", token);
    const { secret } = req.cookies;
    console.log("secret in login", secret);

    await jwt.verify(token, secret, (err, decoded) => {
      console.log("inside JWT");
      console.log("decoded", decoded);
      if (err) console.log("JWT Verify error", err);
    });

    await bcrypt.compare(password, userPassword, (err, match) => {
      if (err) {
        console.log("error in bcrypt.compare", err);
      }
      if (!match) return res.redirect("/signup");
      console.log("Successfully compared bcrypt");
      res.locals.user = data.rows[0];
      return next();
    });
  } catch (err) {
    next({
      log:
        "userController.verifyUser Express error handler caught unknown middleware error",
      status: 400,
      message: { err: "An error occurred" },
    });
  }
};

userController.createUser = (req, res, next) => {
  console.log("IN CREATE USER");
  const { email, password, name } = req.body;
  console.log("email", email, "password ", password, "name", name);
  //   if (!email || !password) {
  //     return next("Missing username or password in userController.createUser");
  //   }

  //check if this work**********
  const create = `INSERT INTO users(email, password, name) VALUES ($1, $2,$3) RETURNING *`;

  const values = [email, password, name];
  const id = `SELECT _id from users WHERE name = ${name}`;

  db.query(create, values)
    .then((data) => {
      // console.log("data!!!!!!!!!!!", data);
      // console.log("data.rows", data.rows);
      const userRow = data.rows.filter((row) => row.email === email);
      // console.log("userRow", userRow);
      res.locals.user = userRow[0]._id;
      console.log("res.locals.newUser", res.locals.user);
      return next();
    })
    .catch((err) => {
      console.log(err);
      const error = {
        log: "createUser Express error handler caught unknown middleware error",
        status: 400,
        message: { err: "An error occurred" },
      };
      next(error);
    });
};

userController.getSavedRecipes = (req, res, next) => {
  // req.params the user
  const { id } = req.params;

  const search = `SELECT name FROM recipes WHERE user_id=${id}`;
  db.query(search)
    .then((data) => {
      //
      // console.log(data);
      res.locals.recipes = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      const error = {
        log:
          "getSavedRecipes Express error handler caught unknown middleware error",
        status: 400,
        message: { err: "An error occurred" },
      };
      next(error);
    });
};

module.exports = userController;
