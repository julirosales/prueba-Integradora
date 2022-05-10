const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const path = require("path");

//vamos a requerir multer
const multer = require("multer");
//vamos a requerir express-validator
const { body, check } = require("express-validator");

//vamos a configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatars");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

//vamos a guardar en una variable la ejecucion de multer
const upload = multer({ storage });

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
  body("perfilUsuario").notEmpty().withMessage("Debes Completar este campo"),
  body("password").notEmpty().withMessage("Contraseña alfanumerica"),
  body("passwordRepit").notEmpty().withMessage("Contraseña alfanumerica"),
  body("imagenDelPerfil").custom((value, { req }) => {
    let file = req.files;
    let aceptedExtencion = [".jpg", ".png"];
    if (!file) {
      throw new Error("tiene que subir una imagen");
    } else {
      let fileExtencion = path.extname(file.originalname);
      if (!aceptedExtencion.includes(fileExtencion)) {
        throw new Error(
          `Las extenciones de archivos permitidas son ${aceptedExtencion.join(
            "-"
          )}`
        );
      }
    }
    return true;
  }),
];

const validacionesLogin = [check("emailLogin").isEmail()
.withMessage("Debes copmpletar un Formato valido"),
check("passwordLogin").isLength({min : 8}).withMessage("La contraseña debe tener al menos 8 caracteres")]

router.get("/login", userController.login);
router.post("/login",validacionesLogin, userController.procesLogin);
//vamos a implementar multer como middelware en get register,despues del single va el nombre del unput que deseamos procesar
router.get("/register", userController.register);
//procesamiento de formulario de register y agregamos middelware de express-validator
router.post(
  "/register",
  upload.single("imagenDelPerfil"),
  validaciones,
  userController.procesRegister
);

module.exports = router;
