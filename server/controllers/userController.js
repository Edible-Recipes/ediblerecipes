const path = require("path");
const bcrypt = require("bcrypt");
// need to require in db
// require bcrypt

// require in database

const userController = {};

userController.verifyUser = async (req, res, next) => {
  try {
    // get login info
    const { username, password } = req.body;

    // incomplete sign in
    if (!username || !password) {
      return next("Missing username or password in userController.verifyUser");
    }

    // search parameters from the table for id and password
    // compare id and password to database info
    const searchUser = "SELECT .....";

    // query SQL database
    const data = await db.query(searchUser);

    if (!username) {
      return res.redirect("/signUp");
    }

    if (!data.rows.length) {
      return res.render("Incorrect username or password. Please try again.");
    }

    // need to verify this after we have database set up
    const userPassword = data.rows[0].password;
    const token = req.cookies.ssid;
    const { secret } = req.cookies;

    await jwt.verify(token, secret, (err, decoded) => {
      if (err) console.log("JWT Verify error");
      else console.log("decoded", decoded);
    });

    await bcrypt.compare(password, userPassword, (err, match) => {
      if (err) {
        console.log("error in bcrypt.compare", err);
      }
      if (!match) return res.redirect("/signup");

      res.locals.user = data;
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
  const { username, password } = req.body;
  console.log("username ", username, "password ", password);
  if (!username || !password) {
    return next("Missing username or password in userController.createUser");
  }

  const create = "INSERT INTO *TABLE*  ......";

  //  let text = `INSERT INTO users (username, password) VALUES ( $1, $2,)`;

  const values = [username, password];

  db.query(create, values)
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch((err) => {
      const err = {
        log: "createUser Express error handler caught unknown middleware error",
        status: 400,
        message: { err: "An error occurred" },
      };
      next(err);
    });
};

userController.getSavedRecipes = (req, res, next) => {
  // req.params the user
  const { id } = req.params;

  const search = `SELECT name FROM recipes WHERE user_id=${id}`;
  db.query(search)
    .then((data) => {
      //
      console.log(data);
      res.locals.recipes = data.rows;
      return next();
    })
    .catch((err) => {
      const err = {
        log:
          "getSavedRecipes Express error handler caught unknown middleware error",
        status: 400,
        message: { err: "An error occurred" },
      };
      next(err);
    });
};

module.exports = userController;
