const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/edibleRecipesModels.js");

const userController = {};

userController.verifyUser = async (req, res, next) => {
  try {

    console.log("req.body", req.body);

    console.log("COOKIES", req.cookies);

    const { email, password } = req.body;

    // Incomplete sign in
    if (!email || !password) {
      return next("Missing username or password in userController.verifyUser");
    }

    // search parameters from the table for id and password
    // compare id and password to database info
    //SELECT password FROM users WHERE email = 'qwen@qwen.qwen';
    const searchUser = `SELECT password, _id FROM users WHERE email = '${email}'`;

    // query SQL database
    const data = await db.query(searchUser);
    // console.log("data.rows in login", data.rows);

    if (!email) {
      return res.redirect("/signup");
    }

    if (!data.rows.length) {
      return res.render("Incorrect email or password. Please try again.");
    }

    // need to verify this after we have database set up
    const userPassword = data.rows[0].password;
    const id = data.rows[0]._id;

    const token = req.cookies.ssid;
    const { secret } = req.cookies;

    await jwt.verify(token, secret, (err, decoded) => {
      // console.log("inside JWT");

      if (err) console.log("JWT Verify error", err);
      else {
        // console.log("decoded", decoded);
      }
    });

    // userPassword is from SQL
    // password is from login page
    await bcrypt.compare(password, userPassword, (err, match) => {
      // console.log('INSIDE BCRYPT COMPARE');
      // console.log('password', password);
      // console.log('userPassword', userPassword);
      if (err) {
        console.log("error in bcrypt.compare", err);
      }
      if (!match) return next({ err });
      // console.log("Successfully compared bcrypt");
      res.locals.user = data.rows[0];
      res.locals.userId = id;
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

userController.hashPassword = async (req, res, next) => {
  try {
    let { email, password, name } = req.body;

    const SALT_WORK_FACTOR = 10;

    function genHash(salt, pw) {
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

    res.locals.newUser = { password: hashedPassword.hash, name, email };

    return next();
  } catch (err) {
    console.log("Error in hash password");
    return next({ err });
  }
};

userController.createUser = async (req, res, next) => {
  let { email, password, name } = res.locals.newUser;
 
  const create = `INSERT INTO users(email, password, name) VALUES ($1, $2,$3) RETURNING *`;

  const values = [email, password, name];

  db.query(create, values)
    .then((data) => {

      const userRow = data.rows.filter((row) => row.email === email);

      res.locals.userId = userRow[0]._id;

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

module.exports = userController;
