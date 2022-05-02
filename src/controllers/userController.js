/* const fs = require("fs");
const path = require("path"); */

const userController = {};

userController.login = (req, res) => {
  res.render("login");
};

userController.register = (req, res) => {
  res.render("register");
};

module.exports = userController;
