/* const fs = require("fs");
const path = require("path"); */

const mainControllers = {}

mainControllers.home = (req,res)=>{
    res.render('home')
}


module.exports = mainControllers;