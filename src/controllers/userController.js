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

userController.procesRegister = (req, res) => {
  let resultValidation = validationResult(req);
  if (resultValidation.errors.length > 0) {
    /* o puedo hacer (!errors.isEmpy()) */
    return res.render("register", {
      errors: resultValidation.mapped(), //o podemos hacer mensajeDeError : resultValidation.mapped();
      oldData: req.body,
    });
  }
  /* return res.send(errors); */ //lo hago para comprobar y ver que trae cada error

  //hice esa linea para verificar lo que me traia en los campos
  /*  return res.send({ body: req.body, file: req.file }) */

  return res.send("todo los datos ok");
};

userController.procesLogin= (req,res)=>{
  let resultValidationLogin = validationResult(req)
  return res.send(resultValidationLogin)
}

module.exports = userController;
