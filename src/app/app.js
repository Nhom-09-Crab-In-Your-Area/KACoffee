
const express = require('express');
var mustacheExpress = require("mustache-express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "../../views"));

app.engine(
  "mustache",
  mustacheExpress(path.join(__dirname, "../../views/partials"), ".mustache")
);

app.use(express.static(path.join(__dirname, "../../public")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname + '/../../views/index'), { name: "Anh" });
});

app.get('/login', (req, res) => {
  res.render(path.join(__dirname + '/../../views/login'), {});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://dbAdminMinh:<123456>@cluster0.x2zsu.mongodb.net/KACOFFEE?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// connect database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbAdminWibu:<12346789>@cluster0.x2zsu.mongodb.net/KACoffee?retryWrites=true&w=majority', () => {
  console.log('Connected to Mongo DB Successfully!!');
})


// const bodyParser = require('body-parser');
// app.use( bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// // 
const router = express.Router();
const User = require('../models/log_model.js');
const bcrypt = require('bcrypt');
router.post('/user', (request, response) => {
  const user = new User({
    email: request.body.email,
    password: request.body.password,
    loginAt: request.body.loginAt,
    logoutAt: request.body.logoutAt,
    action: request.body.action
  });
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    user.save().then(data => {
      console.log('Successfully created a new User');
    }).catch(error => {
      // you can send an error code here
    })
  })
})
module.exports = router;

// //
// router.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'../../views/login.mustache'));
// });



// //
// const ejs = require('ejs');
// app.set('view engine', 'ejs');
// router.get('/users', (request, response) => {
//      User.find({}, (error, result) => {
//      if (result) {  
//          response.render('availableUsers', {'users' : result});
//      } 
//      else {
//           response.status(404)
//      }
//    })
// })


// //
// const passport = require('passport');
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(
//    { usernameField: 'userName' },
//    (userName, password, done) => {
//      User.findOne({userName: userName}, (err, userData) => {
//       let passwordCheck = bcrypt.compareSync(password,   userData.password);
// if(userName === userData.userName && passwordCheck) {
//     return done(null, userData)
//    }
//   })
// }
// ));
// app.post('/login', (req, res, next) => {
// passport.authenticate('local', (err, user, info) => {
//      req.login(user, (err) => {
//      // Write code to redirect to any html page.
//      res.redirect('/index');
//      }
//      )
// })(req, res, next);
// })

// //
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const uuid = require('uuid/v4');
// app.use(session({
//    genid: (req) => {
//    return uuid() // use UUIDs for session IDs
//    },
//    store: new FileStore(),
//    secret: 'any key is fine',
//    resave: false,
//    saveUninitialized: true
// }))
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
// User.findById(id, function(err, user) { 
//     loggedInUser = user;
//     done(err, user);
// });
// });