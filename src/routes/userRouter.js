const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//vamos a requerir multer
const multer = require("multer");

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

router.get("/login", userController.login);
//vamos a implementar multer como middelware en get register,despues del single va el nombre del unput que deseamos procesar
router.get(
  "/register",
  upload.single("imagenDelPerfil"),
  userController.register
);

module.exports = router;
