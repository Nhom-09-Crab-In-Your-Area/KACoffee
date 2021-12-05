const express = require("express");
const morgan = require("morgan");
var mustacheExpress = require("mustache-express");

const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("../dbConfig/connectDB");
const register = require("./register");
const log_in = require("./log_in");
const session_config = require("./session_config");
const log_out = require("./log_out");
const account_utils = require("./alter_data/account_utils");
const product = require("./product/product");
const cart = require("./product/cart");
const purchase = require("./product/purchase");
const blog = require("./blog/blog");
const authen = require("./authentication");
const emailSender = require("./email_manage/email_sender");
const email_sender = require("./email_manage/email_sender");

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "../../views"));
session_config.init(app); //session configuration
authen(app); //authentication

app.engine(
  "mustache",
  mustacheExpress(path.join(__dirname, "../../views/partials"), ".mustache")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // show all response
app.use(express.static(path.join(__dirname, "../../public")));

//render
app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/../../views/index"), { name: "Anh" });
});

app.get("/login", (req, res) => {
  res.render(path.join(__dirname + "/../../views/login"), {});
});

app.get("/product", (req, res) => {
  res.render(path.join(__dirname + "/../../views/product"), {});
});

app.get("/my_profile", (req, res) => {
  res.render(path.join(__dirname + "/../../views/profile/my_profile"), {});
});

app.get("/blog", (req, res) => {
  res.render(path.join(__dirname + "/../../views/blog"), {});
});

app.get("/forgotpassword", (req, res) => {
  res.render(path.join(__dirname + "/../../views/forgotpassword"), {});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//connect db
connectDB();

//utils
register(app); //route: /addCustomer, /addEmployee
log_in(app); //route: /log_in
log_out(app); //route: /log_out
account_utils(app);
product(app);
blog(app);
cart(app);
purchase(app);
authen(app); //authentication
//email_sender(app);
