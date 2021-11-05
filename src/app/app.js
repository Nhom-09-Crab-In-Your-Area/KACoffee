
const express = require("express");
var mustacheExpress = require("mustache-express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const register = require('./register');
app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "../../views"));

app.engine(
  "mustache",
  mustacheExpress(path.join(__dirname, "../../views/partials"), ".mustache")
);

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

//utils
register(app);