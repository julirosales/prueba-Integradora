const fs = require("fs");
const path = require("path");
//vamos a requerir express-validation con metodo validationResoult
const { validationResult } = require("express-validator");

const user = require("../models/user.js");
const bcryptjs = require("bcryptjs");

const userController = {};

userController.login = (req, res) => {
  res.render("login");
};

userController.register = (req, res) => {
  res.render("register");
};

userController.procesRegister = (req, res) => {
  let resultValidation = validationResult(req);
  /*  console.log("body:", req.file); */
  if (resultValidation.errors.length > 0) {
    /* o puedo hacer (!errors.isEmpy()) */
    /*  console.log("body Result:", resultValidation); */
    return res.render("register", {
      errors: resultValidation.mapped(), //o podemos hacer mensajeDeError : resultValidation.mapped();
      oldData: req.body,
    });
  }
  /* return res.send(errors); */ //lo hago para comprobar y ver que trae cada error
  //hice esa linea para verificar lo que me traia en los campos
  /* return res.send({ body: req.body, file: req.file }); */

  let userEnBaseDeDato = user.findByEmail(req.body.email); //lo hago para buscar si ya existe ese email
  if (userEnBaseDeDato) {
    //si existe entra al if y tira el erro
    return res.render("register", {
      errors: {
        email: {
          msg: "Este email ya está registrado",
        },
      },
      oldData: req.body,
    });
  }

  user.create(req.body, req.file); //si no existe sigue con la creacion

  return res.send("se guardo el usuario");
};

userController.procesLogin = (req, res) => {
  /*  console.log("body login:", req.body); */ //verifico que me traiga el req.body
  let userToLogin = user.findByEmail(req.body.email);

  //console.log(userToLogin)
  if (userToLogin) {
    let isOkPassword = bcryptjs.compareSync(
      req.body.password,
      userToLogin.password
    );
    console.log("contraseña encryp:", isOkPassword);
    //compara la contra encriptada con al escrita
    if (isOkPassword) {
      /* console.log(req.session); */
      delete userToLogin.password;
      delete userToLogin.passwordRepit; // lo hago apra borrar la contra ya que en esta instancia no quiero que se vea
      req.session.userLoger = userToLogin; //genero una propiedad en session llamda userloger(usuario logiado ) y le asigno el usertologin
      /* console.log("ivancito:", req.session.userLoger); */
      //vamos a poner cokkies
      if (req.body.recordarUsuario) {
        res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 }); //el valor de maxAge es en milisegundos
      }

      return res.redirect("/user/profile");
    }
    return res.render("login", {
      errors: {
        password: {
          msg: "Contraseña no valida",
        },
      },
    });
  }
  return res.render("login", {
    errors: {
      email: {
        msg: "No se encuentra este Email en la base de datos",
      }, // podemos poner las credenciales son invalidaas
    },
  });
};

userController.profile = (req, res) => {
  /*   console.log("estas en profile:", req.session); */
  /* console.log(req.cookies.userEmail); */
  return res.render("profile", { user: req.session.userLoger });
};

userController.logout = (req, res) => {
  res.clearCookie("userEmail"); //para borrar la cookie de la base y te desloguea automaticamente
  req.session.destroy(); //eso hace es borrar todo lo que este en session de
  return res.redirect("/");
};
module.exports = userController;

/* 
userController.procesLogin = function (req, res) {
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    let usersJSON = fs.readFileSync("user.json", { encoding: "utf-8" });
    let users;
    if (usersJSON == "") {
      users = [];
    } else {
      users = JSON.parse(usersJSON);
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].emailLogin == req.body.emailLogin) {
        if (
          bcrypt.compareSync(req.body.passwordLogin, users[i].passwordLogin)
        ) {
          let usuarioALogearse = users[i];
          break;
        }
      }
    }
    if (usuarioALogearse == undefined) {
      return res.render("login", {
        errors: [{ msg: "credenciales invalidas" }],
      });
    }
    req.session.usuarioLogeado = usuarioALogearse;
  } else {
    res.render("login", { errors: errors.errors });
  }
}; */
/* userController.login = (req, res) => {
  return res.render("login");
}; */
