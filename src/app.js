const express = require("express");
const app = express();
const path = require("path");
//para sesiones agrego esta variable
const session = require("express-session")
const cookieParser = require('cookie-parser')
//traigo las rutas
const userRouter = require("./routes/userRouter");
const mainRouter = require("./routes/mainRouter");
//requiero methodOverride para poder usar put,delete,patch,etc
const methodOverride = require("method-override");
app.set("views", path.join(__dirname, "/views")); // Define la ubicación de la carpeta de las Vistas

//creo rutas
app.use("/", mainRouter);
app.use("/user", userRouter);
//uso el methodOverride
app.use(methodOverride("_method"));

//para que sesion funcione en todos lados
app.use(session({secret: 'top secret',
resave: false,
saveUninitialized: true,
cookie: { secure: true }}));
app.use(cookieParser());

const PORT = process.env.PORT || 3045;

//este use hacer que lo qe se envie en el form por body te lo traiga el dato
app.use(express.urlencoded({extended: false}))

app.use(express.static("public"));
//para poder usar temple engine EJS
app.set("view engine", "ejs");

app.listen(PORT, () => console.log("running on port 3045"));
