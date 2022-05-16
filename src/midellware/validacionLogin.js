//vamos a requerir express-validator
const { check } = require("express-validator");

const validacionesLogin = [
  check("email")
    .isEmail()
    .withMessage("Email invalido"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Contraseña invalida"),
];

module.exports = validacionesLogin;
