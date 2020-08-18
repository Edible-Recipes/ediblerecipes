const jwt = require("jsonwebtoken");

const userController = require("./userController");

const cookieController = {};
cookieController.setCookie = (req, res, next) => {
  //   random number generator for cookie
  random = Math.floor(Math.random() * 100);
  res.cookie("secret", random, { path: "/" });
  return next();
};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log("IN SET SSID COOKIE");
  console.log("res.locals", res.locals);

  const id = res.locals.userId;

  const payload = { id: id };

  const token = jwt.sign(payload, req.cookies.secret, {
    expiresIn: 100000000000,
  });

  res.cookie("ssid", token, { httpOnly: true, path: "/" });
  res.cookie("user_id", id);
  console.log("Successfully set SSID");
  return next();
};

module.exports = cookieController;
