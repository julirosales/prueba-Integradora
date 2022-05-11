const fs = require("fs");
const path = require("path");
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

userController.procesLogin= function (req,res){
  let errors = validationResult(req)
  if(errors.isEmpty()){
    let usersJSON= fs.readFileSync("user.json", {encoding : "utf-8"})
    let users;
    if(usersJSON == ""){
      users = []
    }else{
      users = JSON.parse(usersJSON)
    }
    for (let i = 0 ; i < users.length; i++){
      if( users[i].emailLogin == req.body.emailLogin){
      if(bcrypt.compareSync (req.body.passwordLogin, users[i].passwordLogin)){
         let usuarioALogearse= users[i];
        break
      }
      }
    }
      if(usuarioALogearse == undefined){
        return res.render("login",{errors: [{msg : "credenciales invalidas"}]})
      } 
      req.session.usuarioLogeado = usuarioALogearse;
  }else { res.render ("login",{errors:errors.errors})}
  
}

module.exports = userController;
