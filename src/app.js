const express = require("express");
const app = express();
const path = require("path");
//para sesiones agrego esta variable
const session = require("express-session");
const cookieParser = require("cookie-parser");

//este use hacer que lo qe se envie en el form por body te lo traiga el dato(siempre ponerlo lo mas arriba)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//traigo las rutas
const userRouter = require("./routes/userRouter");
const mainRouter = require("./routes/mainRouter");
const userLogged = require("./midellware/userLogged");
//requiero methodOverride para poder usar put,delete,patch,etc
const methodOverride = require("method-override");
app.set("views", path.join(__dirname, "/views")); // Define la ubicación de la carpeta de las Vistas

//para que sesion funcione en todos lados
app.use(
  session({
    secret: "top secret",
    resave: false,
    saveUninitialized: true,
  })
); // se guarda del lado del servidor
app.use(cookieParser()); // se guarda del lado del navegador y servidor

app.use(userLogged); //tiene que ir despues de la session , xq si no no se ejecuta
//creo rutas
app.use("/", mainRouter);
app.use("/user", userRouter);
//uso el methodOverride
app.use(methodOverride("_method"));

const PORT = process.env.PORT || 3045;

app.use(express.static("public"));
//para poder usar temple engine EJS
app.set("view engine", "ejs");

app.listen(PORT, () => console.log("running on port 3045"));
