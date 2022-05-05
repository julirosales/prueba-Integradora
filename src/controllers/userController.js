/* const fs = require("fs");
const path = require("path"); */
//vamos a requerir express-validation con metodo validationResoult

const { validationResult } = require("express-validator");

const userController = {};

userController.login = (req, res) => {
  res.render("login");
};

userController.register = (req, res) => {
  res.render("register");
};

userController.store = (req, res) => {
  let errors = validationResult(req);
  res.send(errors);
};

module.exports = userController;
