const consign = require("consign");
const express = require("express");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const morgan = require("morgan");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
    secret: "535510N",
    resave: false,
    saveUninitialized: false
}));
app.use(expressValidator());
app.use(morgan("dev"));

consign()
    .include("./config/db_connection.js")
    .then("./src/routes")
    .then("./src/controllers")
    .into(app);

module.exports = app;
