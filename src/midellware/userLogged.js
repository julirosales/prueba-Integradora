//este es un midelware de aplicacion, lo tengo que requerir en app.js
const User = require("../models/User");
function userLogged(req, res, next) {
  res.locals.isLogged = false; // con locals toda al app la conoce , voy a la vista y agrego un if con ejs

  let emailInCookie = req.cookies.userEmail;
  let userFromCookie = User.findByEmail(emailInCookie);
  /*  console.log(userFromCookie); */ //verifico que me traiga todo el usuario

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session && req.session.userLoger) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    /* console.log(res.locals.userLogged) */
  }

  next();
}

module.exports = userLogged;
