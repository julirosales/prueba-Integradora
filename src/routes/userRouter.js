const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const path = require("path");
const validacionRegister = require("../midellware/validacionRegister");
const validacionesLogin = require("../midellware/validacionLogin");

//vamos a requerir multer
const multer = require("multer");

//vamos a configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatars");
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname + "--!" + Date.now());
  },
});

//vamos a guardar en una variable la ejecucion de multer
const upload = multer({ storage });

router.get("/login", userController.login);
router.post("/login",validacionesLogin, userController.procesLogin);
//vamos a implementar multer como middelware en get register,despues del single va el nombre del unput que deseamos procesar
router.get("/register", userController.register);
//procesamiento de formulario de register y agregamos middelware de express-validator
router.post(
  "/register",
  upload.single("imagenDelPerfil"),
  validacionRegister,
  userController.procesRegister
);

module.exports = router;
