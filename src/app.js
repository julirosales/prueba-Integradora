const express = require("express");
const app = express();
const path = require("path");
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

const PORT = process.env.PORT || 3045;

app.use(express.static("public"));
//para poder usar temple engine EJS
app.set("view engine", "ejs");

app.listen(PORT, () => console.log("running on port 3045"));
