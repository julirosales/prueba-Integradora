// 1. guardar al usuario en la db
//2.buscar al usuario que se quiere loguear por su emaail
//3. editar la informacion de un usuario
//4.eliminar a un usuario en la db

const fs = require("fs");
const path = require("path")
const dataBase = path.join(__dirname,"../database/user.json")

const user = {
    fileName : dataBase,

    getData : function (){
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"))//recibe un nombre de archivo y de ese objeto literal al qe te encuentras traeme y te lo devuelve como stringcon parse lo devuelve con array
    },
    /* create: function(userData){

    } */
    findByPK: function(id){ //obtener a todos los usuario por id
        let allUsers = this.getData();
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound
    },
    findByEmail: function(emailLogin, text){ //obtener a todos los usuario por email
        let allUsers = this.getData();
        let userFoundEmail = allUsers.find(oneUser => oneUser.emailLogin === text)
        return userFoundEmail
    }

}
console.log("data base :" + user.getData())
console.log("obejetos"+ user.findByPK(2))
console.log("emailEncontrado : ",+ user.findByEmail("emailLogin","jajaja@gmail.com"))