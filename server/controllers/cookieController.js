const jwt = require("jsonwebtoken");

const userController = require("./userController");

const cookieController = {};
cookieController.setCookie = (req, res, next) => {
  //   random number generatednst
  random = Math.floor(Math.random() * 100);
  res.cookie("secret", random, { path: "/" });
  return next();
};
//hi , what else we need to do here?

cookieController.setSSIDCookie = (req, res, next) => {
  console.log("IN SET SSID COOKIE");
  console.log("res.locals", res.locals);
  //id is undefined, and user is not created
  // console.log('the res.locals.user', res.locals.user);
  // console.log('req.body', req.body);

  // const userid = `SELECT _id FROM users WHERE name = ${name}`;

  //   res.locals.users = userid;
  //   const { name } = res.body;
  //   console.log(req.body);
  //res.locals.uderId or newUser????
  const id = res.locals.userId;
  // console.log('id', id);
  const payload = { id: id };
  // console.log('payload', payload);
  // const { secret } = req.cookies;
  // console.log('this is the req.cookies.secret', req.cookies.secret);

  const token = jwt.sign(payload, req.cookies.secret, {
    expiresIn: 100000000000,
  });

  res.cookie("ssid", token, { httpOnly: true, path: "/" });
  res.cookie("user_id", id);
  console.log("Successfully set SSID");
  return next();
};

module.exports = cookieController;
