// 1. guardar al usuario en la db
//2.buscar al usuario que se quiere loguear por su emaail
//3. editar la informacion de un usuario
//4.eliminar a un usuario en la db

const fs = require("fs");
const path = require("path");
const dataBase = path.join(__dirname, "../database/user.json");
const bcryptjs = require("bcryptjs");

const user = {
  fileName: dataBase,

  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8")); //recibe un nombre de archivo y de ese objeto literal al qe te encuentras traeme y te lo devuelve como stringcon parse lo devuelve con array
  },

  findByPK: function (id) {
    //obtener a todos los usuario por id
    let allUsers = this.getData();
    let userFound = allUsers.find((oneUser) => oneUser.id === id);
    return userFound;
  },
  findByEmail: function (email) {
    //obtener a todos los usuario por email
    let allUsers = this.getData();
    let userFoundEmail = allUsers.find(
      (oneUser) => oneUser.emailLogin === email
    );
    return userFoundEmail;
  },

  generarId: function () {
    let allUsers = this.getData();
    let ultimoUser = allUsers.pop();
    if (ultimoUser) {
      return ultimoUser.id + 1;
    }
    return 1;
  },

  create: function (userData, image) {
    let allUsers = this.getData(); //me traigo todos los usuarios
    let imageFinal = "default-image.png";
    if (image) {
      imageFinal = image.filename;
    }
    let newUser = {
      id: this.generarId(),
      ...userData,
      password: bcryptjs.hashSync(userData.password, 10),
      imageUsuario: imageFinal,
    };

    allUsers.push(newUser); // luego de esto vamos a escrbirlo en el archivo JSON
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, "")); //el write te pide ¿donde lo vas a escribir? en este caso en nuestro valor fileName mas arriba que tiene nuestro JSON//despues le pasamos en formato JSOn con stringify//si quiero mantener el formato edl JSON original pasar dos parametros mas null y un espacio
    return newUser;
  },

  deleteUser: function (idDelete) {
    let allUsers = this.getData();
    let finalUser = allUsers.filter((oneUser) => oneUser.id != idDelete);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUser, null, " "));
    return true;
  },
};
module.exports = user;
