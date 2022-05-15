const { body } = require("express-validator");

//vamos a guardar en una variable de array la info para validar con express-validator
const validaciones = [
  body("nombreyapellido").notEmpty().withMessage("Debes Completar este campo"),
  body("nombreUsuario").notEmpty().withMessage("Debes Completar este campo"),
  body("email")
    .notEmpty()
    .withMessage("Debes Completar este campo")
    .bail()
    .isEmail()
    .withMessage("Debes copmpletar un Formato valido"),
  body("password").notEmpty().withMessage("Contraseña 8 digitos"),
  body("passwordRepit").notEmpty().withMessage("Contraseña 8 digitos"),
];

module.exports = validaciones;
