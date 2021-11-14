const express = require('express');
const morgan = require('morgan')
var mustacheExpress = require("mustache-express");

const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('../dbConfig/connectDB')
const register = require('./register');
const check_log_in = require('./check_log_in');
const edit_info = require('./about_data');
const session_config = require('./session_config');


app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "../../views"));
session_config(app); //session configuration


app.engine(
  "mustache",
  mustacheExpress(path.join(__dirname, "../../views/partials"), ".mustache")
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev')) // show all response
app.use(express.static(path.join(__dirname, "../../public")));

//render 
app.get("/", (req, res) => {
  res.render(path.join(__dirname + '/../../views/index'), { name: "Anh" });
});

app.get('/login', (req, res) => {
  res.render(path.join(__dirname + '/../../views/login'), {});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//connect db
connectDB();

//utils
register(app); //route: /addUser
check_log_in(app); //route: /checkLogin
edit_info(app); // route: /data
