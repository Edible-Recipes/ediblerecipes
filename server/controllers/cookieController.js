// require in jwt
//do we need to npm install? yeah, i just want to make sure we install it in everyone's repo
//hmm truee

const jwt = require('jsonwebtoken');

const userController = require('./userController');

const cookieController = {};
cookieController.setCookie = (req, res, next) => {
  //   random number generatednst
  random = Math.floor(Math.random() * 100);
  res.cookie('secret', random);
  return next();
};
//hi , what else we need to do here?

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('IN SET SSID COOKIE');
  //id is undefined, and user is not created
  console.log('the res.locals.user', res.locals);
  console.log('req.body', req.body);
  const { name } = req.body;
  console.log('name', name);
  // const userid = `SELECT _id FROM users WHERE name = ${name}`;

  //   res.locals.users = userid;
  //   const { name } = res.body;
  //   console.log(req.body);
  const id = res.locals.user;
  console.log('id', id);
  const payload = { id: id };
  console.log('payload', payload);
  // const { secret } = req.cookies;
  console.log('this is the req.cookies.secret', req.cookies.secret);

  const token = jwt.sign(payload, req.cookies.secret, { expiresIn: 300 });

  res.cookie('ssid', token, { httpOnly: true });
  return next();
};

module.exports = cookieController;
