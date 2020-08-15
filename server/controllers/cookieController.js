// require in jwt
//do we need to npm install? yeah, i just want to make sure we install it in everyone's repo
//hmm truee

const jwt = require("jsonwebtoken");

const userController = require("./userController");

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  // write code here
  //random number generated
  const random = Math.floor(Math.random() * 100);
  res.cookie("secret", random);
  return next();
};
//hi , what else we need to do here?

cookieController.setSSIDCookie = (req, res, next) => {
  const { id } = res.locals.user;
  const payload = { id: id };
  const { secret } = req.cookies;

  const token = jwt.sign(payload, secret, { expiresIn: 300 });

  res.cookie("ssid", token, { httpOnly: true });
  return next();
};
