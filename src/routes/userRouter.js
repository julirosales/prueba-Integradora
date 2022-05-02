const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//vamos a requerir multer
const multer = require("multer");
//vamos a requerir express-validator
const { body } = require("express-validator");

//vamos a configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

//vamos a guardar en una variable la ejecucion de multer
const upload = multer({ storage });

//vamos a guardar en una variable de array la info para validar con express-validator
const validaciones = [
  body("nombre").notEmpty().withMessage("Debes Completar este campo"),
  body("nombreUsuario").notEmpty().withMessage("Debes Completar este campo"),
  body("email").isEmail().withMessage("debes copmpletar un EMAIL valido"),
  body("radio").notEmpty().withMessage("Debes Completar este campo"),
  body("password").isPassword().withMessage("contraseña alfanumerica"),
];

router.get("/login", userController.login);
//vamos a implementar multer como middelware en get register,despues del single va el nombre del unput que deseamos procesar
router.get(
  "/register",
  upload.single("imagenDelPerfil"),
  userController.register
);
//procesamiento de formulario de register y agregamos middelware de express-validator
router.post("/home", validaciones, userController.store);

module.exports = router;
