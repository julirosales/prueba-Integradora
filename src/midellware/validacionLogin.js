//vamos a requerir express-validator
const { check } = require("express-validator");

const validacionesLogin = [
  check("emailLogin")
    .isEmail()
    .withMessage("Debes copmpletar un Formato valido"),
  check("passwordLogin")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
];

module.exports = validacionesLogin;
